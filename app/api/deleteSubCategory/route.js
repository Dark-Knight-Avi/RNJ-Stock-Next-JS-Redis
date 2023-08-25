import { fetchredis } from "@/app/helper/redis"
import { db } from "@/app/lib/db"
import { NextResponse } from 'next/server'

export async function POST(response) {
    const { category, subCategory } = await response.json()
    const categoryData = await fetchredis('get', `cat:${category}`)
    const updatedCategory = { ...categoryData, subCategory: categoryData.subCategory.split(', ').filter((sc) => sc !== subCategory).join(', ') }
    await db.set(`cat:${category}`, JSON.stringify(updatedCategory))
    return NextResponse.json({ message: "Deleted Successfully" })
}