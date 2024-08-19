import { ChangeEvent, useState } from "react";
import Header from "./Components/Header/Header";
import ProductCard from "./Components/PRODUCT/ProductCard";
import { PRODUCT_DATA } from "./Components/DATA/PRODUCT_DATA";
import { IPRODUCT_PROPS } from "./Components/INTERFACE/PRODUCT_PROPS";
import MyModal from "./Components/MODEL/Model";
import { INPUT_DATA } from "./Components/DATA/INPUT_DATA";
import Input from "./Components/UI/Input";
import Buttons from "./Components/UI/Buttons";
import { COLOR__LIST } from "./Components/DATA/COLOR_DATA";
import CIRCLE_COLOR from "./Components/CIRCLE__COLOR/CIRCLE_COLOR";
import { PRODUCT_VALIDTION } from "./Components/Validation/Index";
import Error from "./Components/Error/Error";
import Select from "./Components/CATEGORY/Category";
import { CATEGORY__DATA } from "./Components/DATA/CATEGORY_DATA";
import { CATEGORY__PROPS } from "./Components/INTERFACE/CATEGORY__PROPS";
import { INPUT_NAME } from "./Components/INTERFACE/INPUT_PROPS";
import toast, { Toaster } from "react-hot-toast";

function App() {
  // ! Main Product
  const [myproducts, setproduct] = useState<IPRODUCT_PROPS[]>(PRODUCT_DATA);

  // ? TempColor
  const [tempColor, setTempColor] = useState<string[]>([]);

  // ? Errors

  const [ERRORS, setError] = useState({
    TITLE: "",
    DESCRIPTION: "",
    IMG_URL: "",
    PRICE: "",
  });

  // ? INITIAL OBJECT
  const IntialObject = {
    TITLE: "",
    DESCRIPTION: "",
    PRICE: "",
    IMG_URL: "",
    COLORS: [],
    CATEGORY: {
      name: "",
      IMG_URL: "",
    },
  };

  // ! Data Input
  const [dataInput, setDataInput] = useState<IPRODUCT_PROPS>(IntialObject);
  // ! Edit
  const [editProduct, setEditProduct] = useState<IPRODUCT_PROPS>(IntialObject);
  // ! Index
  const [productIndex, setProductIndex] = useState<number>(0);

  // ! Selected
  const [selected, setSelected] = useState<CATEGORY__PROPS>(CATEGORY__DATA[0]);

  // ! Model State
  const [isOpen, setIsOpen] = useState(false);

  // ! Model Update State
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  // ! Model Update State
  const [isDeleteUpdate, setIsDeleteUpdate] = useState(false);

  function closeModal() {
    setIsOpen(false);
    setDataInput(IntialObject);
    setTempColor([]);
  }

  function openModal() {
    setIsOpen(true);
    setDataInput(IntialObject);
    setTempColor([]);
  }
  function closeDeleteModal() {
    setIsDeleteUpdate(false);
  }

  function openDeleteModal() {
    setIsDeleteUpdate(true);
  }

  function closeUpdateModal() {
    setIsOpenUpdate(false);
    setEditProduct(IntialObject);
    setTempColor([]);
  }

  function openUpdateModal() {
    setIsOpenUpdate(true);
    setEditProduct(IntialObject);
    setTempColor([]);
  }

  /* ================= Handler ================= */
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setDataInput({ ...dataInput, [name]: value });
    setError({ ...ERRORS, [name]: "" });
  };

  const handlerEditInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setEditProduct({ ...editProduct, [name]: value });
    setError({ ...ERRORS, [name]: "" });
  };

  const handleSubmit = () => {
    const errors = PRODUCT_VALIDTION({
      TITLE: dataInput.TITLE,
      DESCRIPTION: dataInput.DESCRIPTION,
      PRICE: dataInput.PRICE,
      IMG_URL: dataInput.IMG_URL,
    });

    const MY_VALIDTION =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");

    if (!MY_VALIDTION) {
      setError(errors);
      return;
    }

    setproduct((prev) => [
      {
        ...dataInput,
        ID: Math.random(),
        COLORS: tempColor,
        CATEGORY: selected,
      },
      ...prev,
    ]);

    closeModal();
    toast.success("Successfully Add Product To Your List", {
      duration: 3000,
      position: "top-right",
    });
  };

  // ? Edit Function
  const handleUpdateSubmit = () => {
    const { TITLE, DESCRIPTION, PRICE, IMG_URL } = editProduct;

    const errors = PRODUCT_VALIDTION({
      TITLE,
      DESCRIPTION,
      PRICE,
      IMG_URL,
    });

    const MY_VALIDTION =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");

    if (!MY_VALIDTION) {
      setError(errors);
      return;
    }

    const upDate = [...myproducts];

    upDate[productIndex] = {
      ...editProduct,
      COLORS: tempColor.concat(editProduct.COLORS),
    };

    setproduct(upDate);

    closeUpdateModal();
    toast.success("Successfully Update Product", {
      duration: 3000,
      position: "top-right",
    });
  };

  /* ========================== Create Input ================= */
  const creationInput = (id: string, name: INPUT_NAME, label: string) => {
    return (
      <div className="flex flex-col gap-1 font-medium">
        <label htmlFor={id} className="text-gray-500">
          {label}
        </label>
        <Input
          ID={id}
          TYPE="text"
          className="p-2 focus:ring-2 border rounded-md outline-none"
          NAME={name}
          value={editProduct[name]}
          onChange={handlerEditInput}
        />
        <Error msg={ERRORS[name]} />
      </div>
    );
  };

  /* Circle Color */
  const CIRCLE = COLOR__LIST.map((el) => (
    <CIRCLE_COLOR
      key={el}
      style={{ backgroundColor: el }}
      className="w-5 h-5 rounded-full cursor-pointer"
      onClick={() => {
        if (tempColor.includes(el) || editProduct.COLORS.includes(el)) {
          const Filter = tempColor.filter((item) => item !== el);
          return setTempColor(Filter);
        }
        setTempColor([...tempColor, el]);
      }}
    />
  ));

  // handleDeleteProduct

  const handleDeleteProduct = () => {
    const Filter = myproducts.filter((_, indx) => indx !== productIndex);

    setproduct(Filter);

    closeDeleteModal();
    notify("Product Is Deleted Success", "☠", "#f05");
  };

  // Toast

  const notify = (msg: string, icon: string, BG: string) =>
    toast(msg, {
      duration: 3000,
      position: "top-right",
      icon: icon,
      style: {
        backgroundColor: BG,
        color: "#FFF",
      },
    });

  return (
    <section className="mb-3">
      <div className="container mx-auto">
        <Header openModal={openModal} />
        <ProductCard
          MYPRODUCTS={myproducts}
          openUpdateModal={openUpdateModal}
          setEditProduct={setEditProduct}
          setProductIndex={setProductIndex}
          openDeleteModal={openDeleteModal}
        />
        <MyModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          closeModal={closeModal}
          TITLE="Add New Product"
          DESCRIPTION="Add New Product For Your List ..."
        >
          <form onSubmit={(e) => e.preventDefault()}>
            {INPUT_DATA.map((el) => (
              <div className="flex flex-col gap-1 font-medium" key={el.ID}>
                <label htmlFor={el.ID} className="text text-gray-500">
                  {el.LABEL}
                </label>
                <Input
                  TYPE={el.TYPE}
                  NAME={el.NAME}
                  className="p-2 focus:ring-2 border rounded-md outline-none"
                  ID={el.ID}
                  value={dataInput[el.NAME]}
                  onChange={(e) => handleInput(e)}
                />
                <Error msg={ERRORS[el.NAME]} />
              </div>
            ))}
            {/* Select */}
            <Select selected={selected} setSelected={setSelected} />
            {/* Select */}
            {/* Temp Color */}
            <h2 className="mt-2 text-lg text-gray-500">Selected Color`s : </h2>
            {tempColor.length > 0 ? (
              <div className="temp-color flex gap-1 mt-2 flex-wrap">
                {tempColor.map((el) => (
                  <span
                    className="rounded-md text-white text-xs p-1"
                    style={{ backgroundColor: el }}
                    key={el}
                  >
                    {el}
                  </span>
                ))}
              </div>
            ) : (
              <h2 className="mt-2 text-gray-500">
                You Don't Select Any Color's To Show
              </h2>
            )}
            {/* Temp Color */}
            {/* Start Circle Color */}
            <h2 className="mt-2 text-lg text-gray-500">Platte Color`s : </h2>
            <div className="color flex gap-1 my-2 flex-wrap">{CIRCLE}</div>
            {/* End Circle Color */}
            <div className="btns flex gap-2">
              <Buttons
                className="bg-indigo-500 hover:bg-indigo-400"
                WIDTH="w-full"
                onClick={handleSubmit}
              >
                Submit
              </Buttons>
              <Buttons
                className="bg-gray-500 hover:bg-gray-400"
                WIDTH="w-full"
                onClick={closeModal}
              >
                Cancel
              </Buttons>
            </div>
          </form>
        </MyModal>
        {/* Update Model */}
        <MyModal
          isOpen={isOpenUpdate}
          setIsOpen={openUpdateModal}
          closeModal={closeUpdateModal}
          TITLE="Update Product"
          DESCRIPTION="Update Product ..."
        >
          <form onSubmit={(e) => e.preventDefault()}>
            {creationInput("title", "TITLE", "Product Title")}
            {creationInput("description", "DESCRIPTION", "Product Description")}
            {creationInput("IMAGEURL", "IMG_URL", "Product ImageURL")}
            {creationInput("price", "PRICE", "Product Price")}

            {/* Select */}
            <Select
              selected={editProduct.CATEGORY}
              setSelected={(value) => {
                setEditProduct({ ...editProduct, CATEGORY: value });
              }}
            />

            {/* Select */}

            <div className="flex flex-col gap-1 mt-2 flex-wrap">
              <h2 className=" text-lg text-gray-500">
                Selected Color`s :{" "}
              </h2>
              <div className="colors-list flex gap-1 flex-wrap">
                {tempColor.concat(editProduct.COLORS).map((el) => (
                  <span
                    key={el}
                    style={{ backgroundColor: el }}
                    className="text-white text-xs rounded-md p-1"
                  >
                    {el}
                  </span>
                ))}
              </div>
            </div>
            <h2 className="mt-2 text-lg text-gray-500">Platte Color`s : </h2>
            <div className="color flex gap-1 my-2 flex-wrap">{CIRCLE}</div>

            <div className="btns flex gap-2 mt-2">
              <Buttons
                className="bg-indigo-500 hover:bg-indigo-400"
                WIDTH="w-full"
                onClick={handleUpdateSubmit}
              >
                Update
              </Buttons>
              <Buttons
                className="bg-gray-500 hover:bg-gray-400"
                WIDTH="w-full"
                onClick={closeUpdateModal}
              >
                Cancel
              </Buttons>
            </div>
          </form>
        </MyModal>
        {/* Update Model */}
        {/* Delelte Model */}
        <MyModal
          isOpen={isDeleteUpdate}
          setIsOpen={openDeleteModal}
          closeModal={closeDeleteModal}
          TITLE="Are You Sure To Delete This Product From Your Store ?"
          DESCRIPTION=""
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <h2 className="text-black">His Title Is : {editProduct.TITLE}</h2>
            <p className="text-gray-500">
              His Description Is : {editProduct.DESCRIPTION}
            </p>

            <div className="btns flex gap-2 mt-2">
              <Buttons
                className="bg-[#ef4444] hover:bg-[#ef4444]/90"
                WIDTH="w-full"
                onClick={handleDeleteProduct}
              >
                Deleted
              </Buttons>
              <Buttons
                className="bg-gray-400 hover:bg-gray-500"
                WIDTH="w-full"
                onClick={closeDeleteModal}
              >
                Cancel
              </Buttons>
            </div>
          </form>
        </MyModal>
        {/* Delelte Model */}
        <Toaster />
      </div>
    </section>
  );
}

export default App;
