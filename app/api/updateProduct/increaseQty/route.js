import { getProductById } from "@/app/helper/getProductById"
import { db } from "@/app/lib/db"
import { NextResponse } from 'next/server'

export async function POST(req, res) {
    try {
        const increment = 1
        const { productId } = await req.json()
        const product = await getProductById(productId)
        if (product === -1) {
            return NextResponse.json({ error: "Product not found" }, { status: 400 })
        }
        await db.set(`pdt:${product.productId}:${product.category}`, JSON.stringify({ ...product, quantity: product.quantity + increment }))
        const updatedProduct = await getProductById(productId)
        return NextResponse.json({ message: "Quantity Increased", updatedProduct })
    } catch (error) {
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}