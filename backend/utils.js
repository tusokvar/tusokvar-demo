exports.formatPrice = (basePrice) => {
    const markup = basePrice * 0.10;
    const vat = basePrice * 0.18;
    return (basePrice + markup + vat).toFixed(2);
};
