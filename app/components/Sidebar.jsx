"use client";

import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import Category from "./Category";
import axios from "axios";
import Loader from "./Loader";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

const fetchSidebarData = async () => {
  try {
    const response = await axios.get("/api/getAllCategories");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

function Sidebar() {
  // const [toggleMenu, setToggleMenu] = useState(true);
  const dispatch = useDispatch();
  const { toggleMenu } = useSelector((state) => state.sidebarToggleReducer);
  const sidebarQuery = useQuery({
    queryKey: ["sidebar"],
    queryFn: () => fetchSidebarData(),
  });

  if (sidebarQuery.isLoading) {
    return (
      <div className="w-full">
        <Loader />
      </div>
    );
  }
  return (
    <div
      className={`sidebar bg-gray-800 min-h-[90.5vh] mr-5 ${
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
              dispatch({
                type: "toggle",
              });
            }}
          />
        ) : (
          <RiMenu3Line
            cursor={"pointer"}
            color="#fff"
            size={27}
            onClick={() => {
              dispatch({
                type: "toggle",
              });
            }}
          />
        )}
      </div>
      <div
        className={`toolbox__sidebar-menus ${
          toggleMenu ? "flex flex-col items-center" : "hidden"
        }`}
      >
        <div className=" flex justify-center items-center toolbox__sidebar-menus_profile text-white pb-3 border-b-2 w-[100%] font-bold">
          Stocks
        </div>
        {sidebarQuery.data.data.map((category) => (
          <Category
            key={category.category}
            categoryName={category.category}
            subCategories={category.subCategory}
          />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
