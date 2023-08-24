'use client'
import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiArrowRightLine } from "react-icons/ri";
import { Loader } from "rsuite";

const Page = () => {
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [categories, setCategories] = useState(null);
  const [subcategories, setSubCategories] = useState([]);
  const [product, setProduct] = useState({
    productName: '',
    category: '',
    subCategory: '',
    size: 0,
    weight: 0,
    quantity: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/getAllCategories');
        setCategories(response.data.data);
        setCategory(response.data.data[0].category);
        setSubCategory(response.data.data[0].subCategory.split(', ')[0]);
        // console.log('set')
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
    console.log('useEffect-1')
  }, []);

  useEffect(() => {
    const scats = categories ? categories.find((cat) => cat.category === category).subCategory.split(', ') : [];
    setSubCategories(scats);
    setProduct({ ...product, category, subCategory })
    console.log('useEffect-2')
  }, [categories, category, subCategory]);

  const addProduct = async () => {
    try {
      const response = await axios.post('/api/addProduct', {
        ...product,
        size: product.size === 0 ? 'NA' : `${product.size} inch`,
        weight: product.weight === 0 || product.size > 0 ? 'NA' : `${product.weight} g`,
      });

      if (response.status === 200) {
        setProduct({
          productName: product.productName,
          category,
          subCategory,
          size: Number(product.size) + 1,
          weight: 0,
          quantity: 0,
        });
      } else {
        throw new Error('Bad request');
      }
      // console.log(product);
    } catch (error) {
      console.log("An error occurred:", error.message);
    }
  };


  if (!categories) {
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
            <label htmlFor="size" className="md:text-xl text-lg mt-3">Size:</label>
            <input
              type="number"
              name="size"
              className="bg-slate-900 border-b-2 mr-0 md:mr-5 md:text-xl text-lg placeholder:md:text-xl placeholder:text-sm py-2 text-white outline-none flex-1 mt-1"
              placeholder="Enter product size..."
              value={product.size}
              onChange={(e) =>
                setProduct({
                  ...product,
                  [e.target.name]: e.target.value,
                })
              }
              min={0}
            />
            <label htmlFor="weight" className="md:text-xl text-lg mt-3">Weight:</label>

            <input
              type="number"
              name="weight"
              className="bg-slate-900 border-b-2 mr-0 md:mr-5 md:text-xl text-lg placeholder:md:text-xl placeholder:text-sm py-2 text-white outline-none flex-1 mt-1"
              placeholder="Enter product weight..."
              value={product.weight}
              onChange={(e) =>
                setProduct({
                  ...product,
                  [e.target.name]: e.target.value,
                })
              }
              min={0}
            />
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
