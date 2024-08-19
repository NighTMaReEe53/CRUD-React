import Buttons from "../UI/Buttons";

interface HEADER {
  openModal: () => void;
}

const Header = ({ openModal }: HEADER) => {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:gap-0 justify-between items-center my-3">
      <h2 className="text-3xl font-bold tracking-wide">
        Latest <span className="text-indigo-600 uppercase">Products</span>
      </h2>
      <Buttons
        className="bg-indigo-600 hover:bg-indigo-400 w-full md:w-fit"
        onClick={openModal}
      >
        Add Product
      </Buttons>
    </div>
  );
};

export default Header;
