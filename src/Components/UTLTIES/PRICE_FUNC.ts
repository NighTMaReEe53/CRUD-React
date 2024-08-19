export const PRICE_FUNC = (price: string) => {
  return price.match(/\d{3}/g)?.join(",");
};