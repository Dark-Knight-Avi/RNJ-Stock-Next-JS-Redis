import { getAllProductKeys } from "@/app/helper/getAllProductKeys";
import { db } from "@/app/lib/db";
import { NextResponse } from 'next/server';

export async function POST(req, res) {
    try {

        const { productName, category, subCategory = 'NA', size = 'NA', quantity = 0, weight = 'NA' } = await req.json();

        if (!productName || !category) {
            return NextResponse.json({ error: "productName and category are required" }, { status: 400 });
        }

        const productId = size === 'NA' ? productName.toUpperCase().split(' ').join('') : productName.toUpperCase().split(' ').join('') + size.split(' ')[0];

        const product = {
            productId,
            productName,
            category,
            subCategory,
            size,
            quantity,
            weight
        };
        const allProductIds = await getAllProductKeys()

        if (allProductIds.includes(`pdt:${productId}:${category}`)) {
            return new Response("This product is already added", {
                status: 400,
            });
        }

        // Store the product in Redis
        await db.sadd(`pdt:${productId}:${category}`, JSON.stringify(product));
        return NextResponse.json({ message: "Product added successfully", product }, { status: 200 });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });

    }
}
