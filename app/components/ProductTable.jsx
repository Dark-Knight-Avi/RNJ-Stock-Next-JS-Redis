import React from "react";

const ProductTable = ({ products }) => {
  return (
    <>
      <section className="hidden border-2 min-h-[80px] md:flex justify-center items-center flex-col w-full mt-3">
        <div className="text-2xl font-bold m-3">{products[0].productName}</div>
        <div className="border-t-2 w-full flex flex-col md:flex-row justify-between items-center">
          <div className="col w-full text-center">
            <div className="p-2">Size/Weight</div>
            <div className="p-2 border-t">Quantity</div>
          </div>
          {products.map((product) => (
            <div className="col w-full border-l-2 text-center">
              <div className="p-2">{product.size === 'NA' ? product.weight : product.size}</div>
              <div className="p-2 border-t">{product.quantity}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="md:hidden border-2 min-h-[80px] flex justify-center items-center flex-col w-full mt-5">
        <div className="text-2xl font-bold m-3">{products[0].productName}</div>
        <div className="border-t-2 w-full flex justify-around items-center">
          <div className="p-2 text-center w-1/2">Size</div>
          <div className="p-2 text-center border-l-2 w-1/2">Quantity</div>
        </div>
        {products.sort().map((product) => (
          <div
            key={product.productId}
            className="border-t-2 w-full flex justify-around items-center"
          >
            <div className="p-2 text-center w-1/2">{product.size}</div>
            <div className="p-2 text-center border-l-2 w-1/2">
              {product.quantity}
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default ProductTable;
