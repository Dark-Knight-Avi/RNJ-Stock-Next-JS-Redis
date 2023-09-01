'use client'


import axios from "axios"
import React, { useEffect, useState } from "react"
import Loader from "./components/Loader";
import ProductCard from "./components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState(null)
  const [error, setError] = useState(null); // Add state to handle errors
  const [page, setPage] = useState(1)
  const nextPage = () => {
    setProducts(null)
    if (products.length !== 0) {
      setPage(page + 1)
    }
  }
  const previousPage = () => {
    setProducts(null)
    setPage(page === 1 ? 1 : page - 1)
  }
  const goToPage1 = () => {
    setProducts(null)
    setPage(1)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/getAllProducts', {
          page
        });
        setProducts(response.data.products);

      } catch (error) {
        console.error('Error fetching products:', error);
        setError('An error occurred while fetching products.');
      }
    };

    fetchData();
  }, [page]);

  if (error) {
    return <React.Fragment>
      Error: {error}
      <section className="flex w-full justify-end items-center mt-3 px-3">
        <button onClick={previousPage} className="px-3 text-center py-2 border hover:bg-slate-700 active:bg-slate-800 mr-2">Previous Page</button>
      </section>
    </React.Fragment>;
  }

  if (!products) {
    return <div className="mt-5 flex h-full justify-center items-center">
      <Loader />
    </div>
  }
  return (
    <React.Fragment>
      <section className="mx-3 border border-white mt-5 min-h-[80px] flex justify-between items-center flex-col">
        <div className="text-2xl font-bold m-3">Empty Stocks - Page {page}</div>
        <div className="emptyProducts flex flex-col justify-start items-center w-full h-full border-t border-white">
          <div className='w-full border border-white h-[40px] flex justify-between items-center px-1'>
            <div className="text-sm text-center font-bold w-[33%]">Product Name</div>
            <div className="text-sm text-center font-bold w-[33%]">Subcategory</div>
            <div className="text-sm text-center font-bold w-[33%]">Size/Weight</div>
          </div>
          {products.filter((product) => product.quantity === 0).map((product) => <ProductCard key={product.productId} productId={product.productId} productName={product.productName} category={product.subCategory} subcategory={product.subCategory} size={product.size} weight={product.weight} />)}
        </div>
      </section>
      <section className="flex w-full justify-end items-center mt-3 px-3">
        <button onClick={goToPage1} className="px-3 text-center py-2 border hover:bg-slate-700 active:bg-slate-800 mr-2">Go to Page 1</button>
        <button onClick={previousPage} className="px-3 text-center py-2 border hover:bg-slate-700 active:bg-slate-800 mr-2">Previous Page</button>
        <button onClick={nextPage} className="px-3 text-center py-2 border hover:bg-slate-700 active:bg-slate-800">Next Page</button>
      </section>
    </React.Fragment>
  )
}
