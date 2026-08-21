// Edit these values with your real business details.
// whatsappNumber must include the country code, digits only (no +, no spaces).
// Example for India: "919876543210"
export const siteConfig = {
  businessName: "Gurukrupa Saree Panvel",
  tagline: "Handpicked sarees, draped in tradition",
  whatsappNumber: "919082135450",
  instagramHandle: "",
  city: "Panvel",
};

export function whatsappLink(productName: string, price?: number) {
  const priceText = price ? ` (₹${price.toLocaleString("en-IN")})` : "";
  const message = `Hi! I'm interested in this saree: ${productName}${priceText}. Is it available?`;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}
