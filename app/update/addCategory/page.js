'use client'
import axios from "axios";
import React, { useState } from "react";
import { RiArrowRightLine } from "react-icons/ri";

const Page = () => {
  const [category, setCategory] = useState('')


  const addCategory = async () => {
    try {
      const response = await axios.post('/api/addCategory', {
        category
      })
      if (response.status === 400) {
        throw new Error('Bad request')
      }
      setCategory('')
    } catch (error) {
      console.log("An error occurred:", error.message)
    }
  }
  return (
    <React.Fragment>
      <div className="heading p-3 md:p-0 overflow-hidden">
        <div className="md:text-2xl text-lg font-bold mt-5 flex justify-start items-center">
          Add a new Category <RiArrowRightLine size={20} />
        </div>
        <div className="input mt-5 flex flex-col items-center justify-start">
          <div className="flex flex-col">
            <input
              type="text"
              id="category"
              className="bg-slate-900 border-b-2 mr-0 md:mr-5 md:text-xl text-lg placeholder:md:text-xl placeholder:text-sm py-2 text-white outline-none flex-1"
              placeholder="Enter a new category..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <button onClick={addCategory} className="border mt-3 px-3 py-2 text-center hover:bg-slate-700 active:bg-slate-800">
              Add
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Page;
