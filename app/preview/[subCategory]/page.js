'use client'
import Loader from '@/app/components/Loader';
import ProductTable from '@/app/components/ProductTable';
import { toPascalCase } from '@/app/helper/toPascalCase';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Page = ({ params }) => {
  const [productList, setProductList] = useState(null)
  const { subCategory } = params
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/getAllGroupedProductsBySubCategory', {
          subCategory: toPascalCase(subCategory)
        });
        setProductList(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
    console.log(productList)
  }, []);

  if (!productList) {
    return <div className="w-full"><Loader /></div>;
  }

  return (
    <React.Fragment>
      <section className='flex flex-col w-full p-5'>
        {productList.products.map((group, index) => <ProductTable key={index} products={group} />)}

      </section>
    </React.Fragment>
  )
}

export default Page