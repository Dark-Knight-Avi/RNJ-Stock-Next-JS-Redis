import { db } from "@/app/lib/db";
import { NextResponse } from 'next/server';

export async function POST(req, res) {
    try {

        const { productName, category, subCategory = 'NA', parameter, quantity = 0 } = await req.json();

        if (!productName || !category) {
            return NextResponse.json({ error: "productName and category are required" }, { status: 400 });
        }

        const productId = productName.toUpperCase().split(' ').join('') + parameter.toUpperCase().split(' ').join('') + subCategory.toUpperCase().split(' ').join('')
        const product = {
            productId,
            productName,
            category,
            subCategory,
            parameter,
            quantity
        };


        // Store the product in Redis
        await db.set(`pdt:${productId}:${category}:${subCategory.split(' ').join('-')}`, JSON.stringify(product));
        return NextResponse.json({ message: "Product added successfully", product }, { status: 200 });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });

    }
}
