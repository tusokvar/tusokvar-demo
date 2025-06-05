// backend/utils.js

// פונקציה לחישוב מחיר סופי (כולל markup, processing fee, VAT)
const calculateFinalPrice = ({ basePrice, markupPercent, processingFeePercent, vatPercent }) => {
  let priceWithMarkup = basePrice + (basePrice * markupPercent) / 100;
  let priceWithFee = priceWithMarkup + (priceWithMarkup * processingFeePercent) / 100;
  let priceWithVat = priceWithFee + (priceWithFee * vatPercent) / 100;
  return Math.round(priceWithVat * 100) / 100; // שני ספרות אחרי הנקודה
};

module.exports = { calculateFinalPrice };
