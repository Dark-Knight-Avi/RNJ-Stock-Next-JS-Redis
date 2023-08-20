"use client";

import React, { useState } from "react";
import { Dropdown } from "rsuite";
import SubCategory from "./SubCategory";

const Category = ({ categoryName, subCategories }) => {
  const [menu, showMenu] = useState(false);
  const onClickHandler = () => {
    menu ? showMenu(false) : showMenu(true);
  };

  return (
    <div className="flex flex-col  w-[100%] justify-center items-center border-b-2 border-gray-500 px-5">
      <button
        onClick={onClickHandler}
        className=" focus:text-white toggle text-gray-500 w-[100%] my-2 py-2 flex justify-between items-center "
      >
        {categoryName} <Dropdown />
      </button>
      {subCategories !== "" ? (
        <div
          className={`text-gray-500 text-left toolbox__sidebar-menu_dropdown-menu w-[100%] ${
            menu ? "flex flex-col" : "hidden"
          }`}
        >
          {subCategories.split(", ").map((subCategory, index) => (
            <SubCategory key={index} subCategory={subCategory} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Category;
