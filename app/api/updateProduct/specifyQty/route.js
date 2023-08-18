import { getProductById } from "@/app/helper/getProductById"
import { db } from "@/app/lib/db"
import { NextResponse } from 'next/server'

export async function POST(req, res) {
    try {
        const { productId, qty } = await req.json()
        const product = await getProductById(productId)
        if (product === -1) {
            return NextResponse.json({ error: "Product not found" }, { status: 400 })
        }
        await db.set(`pdt:${product.productId}:${product.category}`, JSON.stringify({ ...product, quantity: qty }))
        const updatedProduct = await getProductById(productId)
        return NextResponse.json({ message: "Quantity Updated", updatedProduct })
    } catch (error) {
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}