'use client'
import Loader from '@/app/components/Loader';
import ProductTable from '@/app/components/ProductTable';
import { toPascalCase } from '@/app/helper/toPascalCase';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
const fetchSubCategoryData = async (subCategory) => {
  try {
    const response = await axios.post('/api/getAllGroupedProductsBySubCategory', {
      subCategory: toPascalCase(subCategory)
    });
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};
const Page = ({ params }) => {
  const { subCategory } = params
  const subCategoryQuery = useQuery({
    queryKey: ["subCategoryTables", subCategory],
    queryFn: () => fetchSubCategoryData(subCategory)
  })

  if (subCategoryQuery.isLoading) {
    return <div className="w-full"><Loader /></div>;
  }

  return (
    <React.Fragment>
      <section className='flex flex-col w-full p-5'>
        <div className="text-2xl font-bold text-center w-full mb-5">{subCategory.split('-').join(' ').toUpperCase()}</div>
        {subCategoryQuery.data.products.map((group, index) => <ProductTable key={index} products={group} isCustom={subCategoryQuery.data.isCustom} />)}

      </section>
    </React.Fragment>
  )
}

export default Page