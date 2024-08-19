interface Error {
  msg: string;
}

const Error = ({ msg }: Error) => {
  return msg && <span className="text-red-500 font-medium">{msg}</span>;
};

export default Error;
