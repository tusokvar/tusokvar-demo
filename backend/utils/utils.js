// backend/utils/utils.js

// חישוב מחיר סופי של הכרטיס ללקוח לפי הסדר הבא:
// מחיר בסיס (Amadeus) -> תוספת רווח (ברירת מחדל 10%) -> מע"מ 18% -> עמלת סליקה 2.9%
const calculateFinalPrice = (basePrice) => {
  // אחוז רווח מהסביבה (10% כברירת מחדל)
  const markupPercent = Number(process.env.MARKUP_PERCENT) || 10;
  
  // אחוז מע״מ מהסביבה (18% כברירת מחדל)
  const vatPercent = Number(process.env.VAT_PERCENT) || 18;

  // אחוז עמלת סליקה מהסביבה (2.9% כברירת מחדל)
  const processingFeePercent = Number(process.env.PROCESSING_FEE_PERCENT) || 2.9;

  // חישוב תוספת רווח למחיר הבסיס
  const priceAfterMarkup = basePrice + (basePrice * (markupPercent / 100));

  // חישוב והוספת מע"מ למחיר
  const priceAfterVAT = priceAfterMarkup + (priceAfterMarkup * (vatPercent / 100));

  // חישוב והוספת עמלת סליקה למחיר
  const finalPrice = priceAfterVAT + (priceAfterVAT * (processingFeePercent / 100));

  // עיגול המחיר הסופי לשני מספרים אחרי הנקודה
  return parseFloat(finalPrice.toFixed(2));
};

// פונקציה לאימות כתובת אימייל
const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

// ייצוא הפונקציות
module.exports = {
  calculateFinalPrice,
  validateEmail,
};
