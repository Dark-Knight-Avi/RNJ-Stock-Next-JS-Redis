import React from "react";
import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";

const SubCategory = ({ subCategory }) => {
  return (
    <Link
      href={`/preview/${subCategory.toLowerCase().split(" ").join("-")}`}
      className="flex justify-between w-[100%] hover:text-gray-400 my-2 focus:text-white items-center"
    >
      {subCategory} <RiArrowRightLine />
    </Link>
  );
};

export default SubCategory;
