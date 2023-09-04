'use client'
import axios from "axios";
import React, { useState } from "react";
import { RiArrowRightLine } from "react-icons/ri";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const [parameter, setParameter] = useState('');

  const addParameter = async () => {
    try {
      const response = await axios.post('/api/addCustomParameter', {
        parameter
      });

      if (response.status === 200) {
        // Parameter added successfully
        toast.success('Parameter Added Successfully!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });

        setParameter('');
      } else {
        // Handle any other error cases here
        toast.error('An error occurred while adding the parameter.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log("An error occurred:", error.message);
    }
  };

  return (
    <React.Fragment>
      <div className="heading p-3 md:p-0 overflow-hidden">
        <div className="md:text-2xl text-lg font-bold mt-5 flex justify-start items-center">
          Add a new parameter <RiArrowRightLine size={20} />
        </div>
        <div className="input mt-5 flex flex-col items-center justify-start">
          <div className="flex flex-col">
            <input
              type="text"
              id="category"
              className="bg-slate-900 border-b-2 mr-0 md:mr-5 md:text-xl text-lg placeholder:md:text-xl placeholder:text-sm py-2 text-white outline-none flex-1"
              placeholder="Enter a new parameter..."
              value={parameter}
              onChange={(e) => setParameter(e.target.value)}
            />
            <button
              onClick={addParameter}
              className="border mt-3 px-3 py-2 text-center hover:bg-slate-700 active:bg-slate-800"
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </React.Fragment>
  );
};

export default Page;
