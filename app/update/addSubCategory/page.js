'use client'

import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiArrowRightLine } from "react-icons/ri";
import { Loader } from "rsuite";

const Page = () => {
  const [subCategory, setSubCategory] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/getAllCategories');
        setCategories(response.data.data);
        setCategory(response.data.data[0].category); // Set the initial selected category
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  const addSubCategory = async () => {
    try {
      const response = await axios.post('/api/addSubCategory', {
        category,
        subCategory
      });

      if (response.status === 200) {
        setSubCategory('');
      } else {
        throw new Error('Bad request');
      }
      // console.log({category, subCategory})
    } catch (error) {
      console.log("An error occurred:", error.message);
    }
  };

  if (!categories) {
    return <div className="w-full"><Loader /></div>;
  }

  return (
    <React.Fragment>
      <div className="heading p-3 md:p-0 overflow-hidden">
        <div className="md:text-2xl text-lg font-bold mt-5 flex justify-start items-center">
          Add a new Subcategory <RiArrowRightLine size={20} />
        </div>
        <div className="input mt-5 flex flex-col items-center justify-start">
          <div className="flex flex-col">
            <label htmlFor="subject" className="md:text-xl text-lg">Add for the Category:</label>
            <select
              value={category}
              id="subject"
              className="bg-slate-900 border-b-2 mr-0 md:mr-5 md:text-xl text-lg placeholder:md:text-xl placeholder:text-sm py-2 text-white outline-none flex-1"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>
            <input
              type="text"
              id="category"
              className="bg-slate-900 border-b-2 mr-0 md:mr-5 md:text-xl text-lg placeholder:md:text-xl placeholder:text-sm py-2 text-white outline-none flex-1 mt-5"
              placeholder="Enter a new subcategory..."
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            />
            <button
              onClick={addSubCategory}
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
