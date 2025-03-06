const Navbar = () => {
  return (
    <nav className=" bg-gray-800 text-white">
      <div className="mycontainer flex justify-between items-center py-5 px-4 h-20">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-red-600">&lt;</span>
          Log
          <span className="text-red-600">In&gt;</span>
        </div>

        {/* <ul>
          <li className="flex gap-4">

            <a className="hover:font-bold" href="/">Home</a>

            <a className="hover:font-bold" href="#">About</a>

            <a className="hover:font-bold" href="#">Contact</a>

          </li>
        </ul> */}
        <button className="flex justify-between items-center text-white bg-red-700 rounded-full ring-white ring-2">
          <img
            className="invert w-10 p-1"
            src="/public/icons/github.png"
            alt=""
          />
          <span className="font-bold px-2">GitHub</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
