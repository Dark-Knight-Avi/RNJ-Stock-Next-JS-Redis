'use client'


import axios from "axios"
import React from "react"
import Loader from "./components/Loader";
import ProductCard from "./components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const fetchPageData = async (page) => {
  try {
    const response = await axios.post('/api/getAllProducts', {
      page
    })
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

export default function Home() {
  const dispatch = useDispatch()
  const { page } = useSelector(state => state.pageNavigateReducer)
  const queryClient = useQueryClient()
  const productsQuery = useQuery({
    queryKey: ['emptyProducts', page],
    queryFn: () => fetchPageData(page)
  })
  const nextPage = () => {
    if (productsQuery.data.products.length !== 0) {
      dispatch({
        type: "nextPage"
      })
      queryClient.invalidateQueries(['emptyProducts'])
    }
  }
  const previousPage = () => {
    dispatch({
      type: "previousPagew"
    })
    queryClient.invalidateQueries(['emptyProducts'])
  }
  const goToPage1 = () => {
    dispatch({
      type: "goToPage1"
    })
    queryClient.invalidateQueries(['emptyProducts'])
  }

  if (productsQuery.isError) {
    return <React.Fragment>
      Error: {productsQuery.error}
      <section className="flex w-full justify-end items-center mt-3 px-3">
        <button onClick={previousPage} className="px-3 text-center py-2 border hover:bg-slate-700 active:bg-slate-800 mr-2">Previous Page</button>
      </section>
    </React.Fragment>;
  }

  if (productsQuery.isLoading) {
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
          {productsQuery.data.products.filter((product) => product.quantity === 0).map((product) => <ProductCard key={product.productId} productId={product.productId} productName={product.productName} category={product.category} subcategory={product.subCategory} size={product.size} weight={product.weight} />)}
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
