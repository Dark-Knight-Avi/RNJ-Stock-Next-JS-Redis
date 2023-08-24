import { getAllProductKeys } from "@/app/helper/getAllProductKeys";
import { db } from "@/app/lib/db";
import { NextResponse } from 'next/server';

export const POST = async (request) => {
    try {
        const { subCategory } = await request.json();

        if (!subCategory || subCategory.length === 0) {
            return NextResponse.json({ error: 'Invalid Subcategory' }, { status: 400 });
        }
        const allProductKeys =  await getAllProductKeys()
        const allSubCategoryKeys = allProductKeys.filter((key) => key.split(':')[3] === subCategory.split(' ').join('-'))
        const products = []
        for(const key of allSubCategoryKeys) {
            const product = await db.get(allSubCategoryKeys[0])
            products.push(product)
        }
        return NextResponse.json({ type: 'Products by subcategory', products });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: `An error occurred: ${error}` }, { status: 500 });
    }
};
