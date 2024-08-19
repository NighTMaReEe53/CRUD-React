import Image from "../IMAGE_COMPONENTS/Image";
import { IPRODUCT_PROPS } from "../INTERFACE/PRODUCT_PROPS";
import Buttons from "../UI/Buttons";
import { PRICE_FUNC } from "../UTLTIES/PRICE_FUNC";

interface IPRODUCT {
  MYPRODUCTS: IPRODUCT_PROPS[];
  openUpdateModal: () => void;
  setEditProduct: (product: IPRODUCT_PROPS) => void;
  setProductIndex: (value: number) => void;
  openDeleteModal: () => void;
}

const ProductCard = ({
  MYPRODUCTS,
  openUpdateModal,
  setEditProduct,
  setProductIndex,
  openDeleteModal,
}: IPRODUCT) => {
  // ? Handler

  const handleSubmit = (item: IPRODUCT_PROPS, idx: number) => {
    openUpdateModal();
    setEditProduct(item);
    setProductIndex(idx);
  };

  const handleDeleteItem = (item: IPRODUCT_PROPS, idx: number) => {
    openDeleteModal();
    setEditProduct(item);
    setProductIndex(idx);
  };

  /*  ========== Looping One Prodcut Data ============== */

  const PRODUCTS = MYPRODUCTS.map((product, indx) => (
    <div key={product.ID} className="bg-white p-2 border rounded-md shadow-sm">
      <div className="image">
        <Image
          SRC={product.IMG_URL}
          ALT={product.TITLE}
          className="rounded-md w-full h-52 object-cover"
        />
      </div>
      <div className="text">
        <h2 className="text-2xl font-bold text-black mt-2">{product.TITLE}</h2>
        <p className="text-xs text-gray-500 font-medium my-2">
          {product.DESCRIPTION}
        </p>
      </div>
      <div className="colors flex flex-wrap gap-1 mb-2">
        {product.COLORS.length > 0 ? (
          product.COLORS.map((el) => (
            <span
              style={{ backgroundColor: el }}
              className="w-5 h-5 rounded-full cursor-pointer"
              key={el}
            ></span>
          ))
        ) : (
          <h2 className="text-gray-500">Not Avaliable Color`s</h2>
        )}
      </div>
      <div className="category flex justify-between items-center">
        <div className="price text-lg font-medium text-indigo-500 tracking-wide">
          ${PRICE_FUNC(product.PRICE)}
        </div>
        <div className="flex items-center gap-1">
          <Image
            SRC={product.CATEGORY.IMG_URL}
            ALT={product.TITLE}
            className="w-9 h-9 rounded-full object-cover"
          />
          <span className="text-gray-500 tracking-wide">
            {product.CATEGORY.name}
          </span>
        </div>
      </div>
      <div className="btn flex gap-1 mt-2">
        <Buttons
          className="bg-[#7c3aed] hover:bg-[#7c3aed]/90"
          WIDTH="w-full"
          onClick={() => handleSubmit(product, indx)}
        >
          Edit
        </Buttons>
        <Buttons
          className="bg-[#ef4444] hover:bg-[#ef4444]/90"
          WIDTH="w-full"
          onClick={() => handleDeleteItem(product, indx)}
        >
          Delete
        </Buttons>
      </div>
    </div>
  ));

  return (
    <div className="product-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      {PRODUCTS}
    </div>
  );
};

export default ProductCard;
