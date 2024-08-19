interface IMAGE_PROPS {
  SRC: string;
  ALT: string;
  className: string;
}

const Image = ({ ALT, SRC, className }: IMAGE_PROPS) => {
  return <img src={SRC} alt={ALT} className={`${className}`} />;
};

export default Image;
