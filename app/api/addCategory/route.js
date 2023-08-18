import { getAllCategoryKeys } from "@/app/helper/getAllCategoryKeys";
import { db } from "@/app/lib/db";
import { NextResponse } from 'next/server';

export async function POST(req, res) {
    try {

        const { category, subCategory = '' } = await req.json();

        if (!category) {
            return NextResponse.json({ error: "category is required" }, { status: 400 });
        }
        const allCategoryKeys = await getAllCategoryKeys()

        if (allCategoryKeys.includes(`cat:${category}`)) {
            return new Response("This product is already added", {
                status: 400,
            });
        }

        // Store the product in Redis
        await db.set(`cat:${category}`, JSON.stringify({ category, subCategory: subCategory }));
        return NextResponse.json({ message: "Category added successfully", addedCategory: { category, subCategory: subCategory.toString() } }, { status: 200 });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });

    }
}
