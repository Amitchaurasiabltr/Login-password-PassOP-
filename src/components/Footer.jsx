
const Footer = () => {
  return (
    <div className=" bg-gray-800 text-white flex flex-col bottom-0 w-full justify-center items-center">
      <div className="logo font-bold text-white text-2xl">
        <span className="text-red-600">&lt;</span>
        Log
        <span className="text-red-600">In&gt;</span>
      </div>
      <div className="flex justify-center items-center">
        Created whit <img className="h-6 mx-1" src="/public/icons/l1.png" alt="" />{" "}
        by Amit Chaurasia
      </div>
    </div>
  );
};

export default Footer;
