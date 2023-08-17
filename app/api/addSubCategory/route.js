import { getAllCategoryKeys } from "@/app/helper/getAllCategoryKeys";
import { getAllProductKeys } from "@/app/helper/getAllProductKeys";
import { db } from "@/app/lib/db";
import { NextResponse } from 'next/server';

export async function POST(req, res) {
    try {

        const { category, subCategory } = await req.json();

        if (!category || !subCategory) {
            return NextResponse.json({ error: "category and subcategory is required" }, { status: 400 });
        }

        const currentData = await db.get(`cat:${category}`)
        // console.log(currentData)
        const currentSubCategories = currentData.subCategory === '' ? [] : currentData.subCategory.split(', ')
        const subCategoriesToAdd = subCategory.split(', ')
        const newSubCategories = [...currentSubCategories, ...subCategoriesToAdd]
        const newSubCategoriesSet = new Set(newSubCategories)
        const uniqueNewSubCategories = Array.from(newSubCategoriesSet)

        // Store the product in Redis
        await db.set(`cat:${category}`, JSON.stringify({ category, subCategory: uniqueNewSubCategories.join(', ') }));
        return NextResponse.json({ message: "Subcategory added successfully", updatedCategory: { category, subCategory: uniqueNewSubCategories.join(', ') } }, { status: 200 });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });

    }
}
