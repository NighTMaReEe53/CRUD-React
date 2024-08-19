interface PRODUCT_PROPS {
  TITLE: string;
  DESCRIPTION: string;
  IMG_URL: string;
  PRICE: string;
}

export const PRODUCT_VALIDTION = (product: PRODUCT_PROPS) => {
  const errors: PRODUCT_PROPS = {
    TITLE: "",
    DESCRIPTION: "",
    IMG_URL: "",
    PRICE: "",
  };

  if (
    !product.TITLE.trim() ||
    product.TITLE.length < 10 ||
    product.TITLE.length > 30
  ) {
    errors.TITLE = "We Must Have 10 Char To 30 Char";
  }
  if (
    !product.DESCRIPTION.trim() ||
    product.DESCRIPTION.length < 10 ||
    product.DESCRIPTION.length > 900
  ) {
    errors.DESCRIPTION = "We Must Have 10 Char To 900 Char";
  }
  if (!product.IMG_URL.trim()) {
    errors.IMG_URL = "Product Image Is Required";
  }
  if (!product.PRICE.trim() || isNaN(parseInt(product.PRICE))) {
    errors.PRICE = "Price Is Required";
  }

  return errors;
};
