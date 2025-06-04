// backend/utils.js

function calculateFinalPrice(basePrice, options = {}) {
  const {
    markupPercent = parseFloat(process.env.MARKUP_PERCENT) || 10,
    vatPercent = parseFloat(process.env.VAT_PERCENT) || 17,
    processingFeePercent = parseFloat(process.env.PROCESSING_FEE_PERCENT) || 2.3,
    couponDiscountPercent = 0
  } = options;

  let price = basePrice;

  // רווח
  price += (price * markupPercent) / 100;

  // מע״מ
  price += (price * vatPercent) / 100;

  // עמלות סליקה
  price += (price * processingFeePercent) / 100;

  // קופון
  if (couponDiscountPercent > 0) {
    price -= (price * couponDiscountPercent) / 100;
  }

  return parseFloat(price.toFixed(2));
}

module.exports = {
  calculateFinalPrice
};
