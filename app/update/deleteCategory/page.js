'use client'

import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiArrowRightLine } from "react-icons/ri";
import { Loader } from "rsuite";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);

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
        setIsDeleted(false);
    }, [isDeleted]);

    const deleteCategory = async () => {
        try {
            const response = await axios.delete('/api/deleteCategory', {
                data: { category } // Send the category as part of the request data
            });

            if (response.status === 200) {
                // Category deleted successfully
                toast.success('Category Deleted Successfully!', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                });

                setIsDeleted(true);
                setCategory(categories[0].category); // Fix: Use categories directly without .data
            } else {
                // Handle any other error cases here
                toast.error('An error occurred while deleting the category.', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                });
            }
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
                    Delete a Category <RiArrowRightLine size={20} />
                </div>
                <div className="input mt-5 flex flex-col items-center justify-start">
                    <div className="flex flex-col">
                        <label htmlFor="subject" className="md:text-xl text-lg">Delete Category:</label>
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
                        <button onClick={deleteCategory} className="border mt-3 px-3 py-2 text-center hover:bg-slate-700 active:bg-slate-800">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </React.Fragment>
    );
};

export default Page;
