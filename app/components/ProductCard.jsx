import React from "react";

const ProductCard = ({
  productId,
  productName,
  category,
  subcategory,
  size,
  weight
}) => {
  return (
    <div className="w-full border border-white h-[40px] flex justify-between items-center px-1">
      <div className="text-xs text-center font-semibold w-[33%]">{productName}</div>
      <div className="text-xs text-center font-semibold w-[33%]">{category}</div>
      <div className="text-xs text-center font-semibold w-[33%]">{size === 'NA' ? weight : size}</div>
    </div>
  );
};

export default ProductCard;
