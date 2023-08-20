import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <React.Fragment>
      <div className="flex justify-center bg-slate-900 text-white ">
        <nav className="self-center w-full max-w-7xl  ">
          <div className="flex md:flex-row flex-col  justify-between items-center md:items-start">
            <h1 className=" py-4 text-2xl font-sans font-bold px-10 text-center">
              RNJ Silver Stock
            </h1>
            <ul className="flex justify-center my-4  items-center text-sm md:text-[18px] font-bold  md:px-10">
              <li className="hover:underline  underline-offset-4 decoration-2 decoration-white py-2 rounded-lg px-2 md:px-5">
                <Link href="/">Dashboard</Link>
              </li>
              <li className="hover:underline  underline-offset-4 decoration-2 decoration-white py-2 rounded-lg px-2 md:px-5">
                <Link href="/preview">Preview</Link>
              </li>
              <li className="hover:underline underline-offset-4 decoration-2 decoration-white py-2 rounded-lg px-2 md:px-5">
                <Link href="/update">Update</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

    </React.Fragment>
  );
};

export default Navbar;
