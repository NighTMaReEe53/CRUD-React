export interface IPRODUCT_PROPS {
  ID?: number;
  TITLE: string;
  DESCRIPTION: string;
  IMG_URL: string;
  PRICE: string;
  COLORS: string[];
  CATEGORY: { name: string; IMG_URL: string };
}
