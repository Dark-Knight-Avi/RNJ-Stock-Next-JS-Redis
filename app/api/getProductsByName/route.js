import { getProductsByName } from "@/app/helper/getProductsByName";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { productName } = await request.json()
    if (!productName || productName.length === 0) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 })
    }
    const products = await getProductsByName(productName)
    if (products.length === 0) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
    return NextResponse.json({ type: 'all products', data: products });
}
