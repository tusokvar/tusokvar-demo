import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Payment.css";

const API_URL = "https://YOUR-BACKEND-URL.onrender.com/api"; // עדכן לכתובת שלך

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
    setPaying(true);
    setErr("");
    try {
      // תהליך תשלום סימולציה בלבד. בפועל יש לחבר ל-Stripe Checkout!
      // שלח ל-backend פרטי התשלום והזמנה
      await axios.post(${API_URL}/payment, {
        amount: Number(flight.price.total),
        email,
        name,
        card,
        flightId: flight.id
      });
      // שליחת מייל (אפשרות)
      await axios.post(`${API_URL}/emails/send
