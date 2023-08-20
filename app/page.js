'use client'


import axios from "axios"
import React, { useEffect, useState } from "react"
import Loader from "./components/Loader";
import ProductCard from "./components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/getAllProducts');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  if (!products) {
    return <div className="mt-5 flex h-full justify-center items-center">
      <Loader />
    </div>
  }
  return (
    <React.Fragment>
      <section className="mx-3 border border-white mt-5 min-h-[80px] flex justify-between items-center flex-col">
        <div className="text-2xl font-bold m-3">Empty Stocks</div>
        <div className="emptyProducts flex flex-col justify-start items-center w-full h-full border-t border-white">
          <div className='w-full border border-white h-[40px] flex justify-between items-center px-1'>
            <div className="text-sm text-center font-bold w-[33%]">Product Name</div>
            <div className="text-sm text-center font-bold w-[33%]">Category</div>
            <div className="text-sm text-center font-bold w-[33%]">Size/Weight</div>
          </div>
          {products.data.filter((product) => product.quantity === 0).map((product) => <ProductCard key={product.productId} productId={product.productId} productName={product.productName} category={product.category} subcategory={product.subCategory} size={product.size} weight={product.weight}/>)}
        </div>
      </section>
    </React.Fragment>
  )
}
