import { getAllProductKeys } from "@/app/helper/getAllProductKeys";
import { db } from "@/app/lib/db";
import { NextResponse } from 'next/server';

export const POST = async (request) => {
    try {
        const { subCategory } = await request.json();

        if (!subCategory || subCategory.length === 0) {
            return NextResponse.json({ error: 'Invalid Subcategory' }, { status: 400 });
        }
        const productKey = [];
        const productValue = [];
        const allProductKeys = await getAllProductKeys();

        for (const key of allProductKeys) {
            const product = await db.get(key);
            const name = product.productName;
            if (product.subCategory === subCategory) {
                if (!productKey.includes(name)) {
                    productKey.push(name)
                    productValue.push([product])
                } else {
                    productValue[productKey.indexOf(name)].push(product)
                }
            }
        }
        return NextResponse.json({ type: 'Products by subcategory', products: productValue.filter((group) => group[0].subCategory === subCategory) });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
};
