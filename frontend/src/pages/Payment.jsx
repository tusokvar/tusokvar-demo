import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import "./Payment.css";

const Payment = () => {
  const [flight, setFlight] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [paying, setPaying] = useState(false);
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState("");
  const [cancellationPolicy, setCancellationPolicy] = useState("ביטול עד 24 שעות לפני הטיסה – דמי ביטול 90 ₪");

  useEffect(() => {
    const sel = localStorage.getItem("selected-flight");
    if (sel) setFlight(JSON.parse(sel));
  }, []);

  const handlePay = async (e) => {
    e.preventDefault();
    if (!name || !email || !card) {
      setErr("יש למלא את כל הפרטים");
      return;
    }
    setPaying(true);
    setErr("");
    try {
      // קריאה לתשלום (סימולציה. יש להחליף ל-Stripe אמיתי בהמשך)
      await axios.post(`${API_URL}/payment`, {
        amount: Number(flight.price.total),
        email,
        name,
        card,
        flightId: flight.id
      });
      // שלח מייל אישור (סימולציה, אתה יכול להפעיל גם ב-backend)
      await axios.post(`${API_URL}/emails/send-confirmation`, {
        email,
        bookingDetails: `
        תודה שהזמנת טיסה עם טוסו כבר!
        טיסה מ-${flight.itineraries[0].segments[0].departure.iataCode} ל-${flight.itineraries[0].segments[0].arrival.iataCode}
        תאריך: ${flight.itineraries[0].segments[0].departure.at}
        מחיר: ${flight.price.total} ₪
        `
      });
      setSuccess(true);
    } catch (error) {
      setErr("שגיאה בתשלום. נסה שוב או בדוק את הפרטים.");
    }
    setPaying(false);
  };

  if (!flight) return <div className="payment-container">לא נבחרה טיסה</div>;
  if (success) return (
    <div className="payment-container">
      <h2>התשלום בוצע בהצלחה!</h2>
      <div>אישור הזמנה נשלח למייל שלך.</div>
    </div>
  );

  return (
    <div className="payment-container">
      <h2>תשלום עבור טיסה</h2>
      <div className="flight-summary">
        <div>
          <b>{flight.itineraries[0].segments[0].departure.iataCode} → {flight.itineraries[0].segments[0].arrival.iataCode}</b>
          <br />
          <span>חברת תעופה: {flight.itineraries[0].segments[0].carrierCode}</span>
          <br />
          <span>תאריך: {flight.itineraries[0].segments[0].departure.at.slice(0,10)}</span>
        </div>
        <div>
          <span>מחיר: <b>{Number(flight.price.total).toLocaleString()} ₪</b></span>
          <br />
          <span>דמי טיפול: {Number(flight.price.markup).toLocaleString()} ₪</span>
          <br />
          <span>מע״מ: {Number(flight.price.vat).toLocaleString()} ₪</span>
        </div>
      </div>
      <div className="cancellation-policy">
        <b>תנאי ביטול:</b> {cancellationPolicy}
      </div>
      <form className="payment-form" onSubmit={handlePay}>
        <div>
          <label>שם מלא</label>
          <input value={name} onChange={e => setName(e.target.value)} required placeholder="שם מלא" />
        </div>
        <div>
          <label>אימייל</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="אימייל לקבלת אישור" />
        </div>
        <div>
          <label>מספר כרטיס אשראי</label>
          <input value={card} onChange={e => setCard(e.target.value)} required placeholder="1234-5678-1234-5678" />
        </div>
        <button type="submit" disabled={paying}>{paying ? "מעבד תשלום..." : "שלם עכשיו"}</button>
        {err && <div className="error">{err}</div>}
      </form>
    </div>
  );
};

export default Payment;
