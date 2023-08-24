"use client";

import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine, RiArrowRightLine } from "react-icons/ri";
import Link from "next/link";
function UpdateSidebar() {
  const [toggleMenu, setToggleMenu] = useState(true);

  return (
    <div
      className={`sidebar bg-gray-800 min-h-[90.5vh] mr-2 md:mr-5 ${
        toggleMenu ? "md:min-w-[300px] min-w-[150px]" : "min-w-[40px]"
      } flex flex-col`}
    >
      <div className="sidebar-navigation flex justify-end items-center">
        {toggleMenu ? (
          <RiCloseLine
            cursor={"pointer"}
            color="#fff"
            size={27}
            onClick={() => {
              setToggleMenu(false);
            }}
          />
        ) : (
          <RiMenu3Line
            cursor={"pointer"}
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
      </div>
      <div
        className={`toolbox__sidebar-menus ${
          toggleMenu ? "flex flex-col items-center" : "hidden"
        }`}
      >
        <div className=" flex justify-center items-center toolbox__sidebar-menus_profile text-white pb-3 border-b-2 w-[100%] font-bold">
          Update
        </div>
        <div className="flex flex-col  w-[100%] justify-center items-center border-b-2 border-gray-500 px-5">
          <Link
            href="/update/addCategory"
            className=" focus:text-white toggle text-gray-500 w-[100%] my-2 py-2 flex justify-between items-center "
          >
            Add Category <RiArrowRightLine />
          </Link>
        </div>
        <div className="flex flex-col  w-[100%] justify-center items-center border-b-2 border-gray-500 px-5">
          <Link
            href="/update/addProduct"
            className=" focus:text-white toggle text-gray-500 w-[100%] my-2 py-2 flex justify-between items-center "
          >
            Add/Update Product <RiArrowRightLine />
          </Link>
        </div>
        <div className="flex flex-col  w-[100%] justify-center items-center border-b-2 border-gray-500 px-5">
          <Link
            href="/update/addSubCategory"
            className=" focus:text-white toggle text-gray-500 w-[100%] my-2 py-2 flex justify-between items-center "
          >
            Add Subcategory <RiArrowRightLine />
          </Link>
        </div>
        <div className="flex flex-col  w-[100%] justify-center items-center border-b-2 border-gray-500 px-5">
          <Link
            href="/update/deleteCategory"
            className=" focus:text-white toggle text-gray-500 w-[100%] my-2 py-2 flex justify-between items-center "
          >
            Delete Category <RiArrowRightLine />
          </Link>
        </div>
        <div className="flex flex-col  w-[100%] justify-center items-center border-b-2 border-gray-500 px-5">
          <Link
            href="/update/deleteSubCategory"
            className=" focus:text-white toggle text-gray-500 w-[100%] my-2 py-2 flex justify-between items-center "
          >
            Delete Subcategory <RiArrowRightLine />
          </Link>
        </div>
        
      </div>
    </div>
  );
}

export default UpdateSidebar;
