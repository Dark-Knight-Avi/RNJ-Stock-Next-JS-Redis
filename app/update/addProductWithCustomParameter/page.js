'use client'
import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiArrowRightLine } from "react-icons/ri";
import { Loader } from "rsuite";

const Page = () => {
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState(null);
  const [subCategory, setSubCategory] = useState('');
  const [subcategories, setSubCategories] = useState([]);
  const [parameter, setParameter] = useState('')
  const [parameters, setParameters] = useState([])
  const [product, setProduct] = useState({
    productName: '',
    category: '',
    subCategory: '',
    parameter: '',
    quantity: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get('/api/getAllCategories');
        const response2 = await axios.get('/api/getAllCustomParameters');
        setCategories(response1.data.data);
        setParameters(response2.data.parameters)
        setCategory(response1.data.data[0].category);
        setParameter(response2.data.parameters[0].parameter);
        setSubCategory(response1.data.data[0].subCategory.split(', ')[0]);
        // console.log('set')
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
    // console.log('useEffect-1', parameter)
  }, []);

  useEffect(() => {
    const scats = categories ? categories.find((cat) => cat.category === category).subCategory.split(', ') : [];
    setSubCategories(scats);
    if (scats.length > 1) {
      setProduct({ ...product, category, subCategory, parameter })
    } else {
      setProduct({ ...product, category, subCategory: scats[0], parameter })
    }
    // console.log('useEffect-2', parameter)
  }, [categories, category, parameter]);

  const addProduct = async () => {
    try {
      // console.log('add', product);
      const response = await axios.post('/api/addProductWithCustomParameter', {
        ...product
      });
      if (response.status === 200) {
        setProduct({
          productName: product.productName,
          category,
          subCategory,
          parameter: parameters[0].parameter,
          quantity: 0,
        });
      } else {
        throw new Error('Bad request');
      }
    } catch (error) {
      console.log("An error occurred:", error.message);
    }
  };


  if (!categories || parameters.length === 0) {
    return <div className="w-full"><Loader /></div>;
  }

  return (
    <React.Fragment>
      <div className="heading p-0 md:p-3 overflow-hidden">
        <div className="md:text-2xl text-lg font-bold mt-5 flex justify-start items-center">
          Add/Update a new Product <RiArrowRightLine size={20} />
        </div>
        <div className="input mt-5 flex flex-col items-center justify-start">
          <div className="flex flex-col">
            <select
              value={category}
              id="categories"
              className="bg-slate-900 border-b-2 mr-0 md:mr-5 md:text-xl text-lg placeholder:md:text-xl placeholder:text-sm py-2 text-white outline-none flex-1"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>

            <label htmlFor="subcategories" className="md:text-xl text-lg mt-3">Add for the Subcategory:</label>
            <select
              id="subcategories"
              className="bg-slate-900 border-b-2 mr-0 md:mr-5 md:text-xl text-lg placeholder:md:text-xl placeholder:text-sm py-2 text-white outline-none flex-1"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)} // Fix this line
            >
              {subcategories.map((scat, index) => (
                <option key={index} value={scat}>
                  {scat}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="productName"
              className="bg-slate-900 border-b-2 mr-0 md:mr-5 md:text-xl text-lg placeholder:md:text-xl placeholder:text-sm py-2 text-white outline-none flex-1 mt-5"
              placeholder="Enter product name..."
              value={product.productName}
              onChange={(e) =>
                setProduct({
                  ...product,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <label htmlFor="subcategories" className="md:text-xl text-lg mt-3">Parameter:</label>
            <select
              id="subcategories"
              className="bg-slate-900 border-b-2 mr-0 md:mr-5 md:text-xl text-lg placeholder:md:text-xl placeholder:text-sm py-2 text-white outline-none flex-1"
              value={parameter}
              onChange={(e) => setParameter(e.target.value)} // Fix this line
            >
              {parameters.map((param, index) => (
                <option key={index} value={param.parameter}>
                  {param.parameter}
                </option>
              ))}
            </select>
            <label htmlFor="quantity" className="md:text-xl text-lg mt-3">Quantity:</label>

            <input
              type="number"
              name="quantity"
              className="bg-slate-900 border-b-2 mr-0 md:mr-5 md:text-xl text-lg placeholder:md:text-xl placeholder:text-sm py-2 text-white outline-none flex-1 mt-1"
              placeholder="Enter quantity..."
              value={product.quantity}
              onChange={(e) =>
                setProduct({
                  ...product,
                  [e.target.name]: e.target.value,
                })
              }
              min={0}
            />
            <button
              onClick={addProduct}
              className="border mt-3 px-3 py-2 text-center hover:bg-slate-700 active:bg-slate-800"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Page;
