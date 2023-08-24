import { getAllCategoryKeys } from "@/app/helper/getAllCategoryKeys"
import { db } from "@/app/lib/db"
import { NextResponse } from 'next/server'

export async function DELETE(response) {
    const { category } = await response.json()
    const allCategoryKeys = await getAllCategoryKeys()
    if(!allCategoryKeys.includes(`cat:${category}`)){
        return NextResponse.json({error: "No such Category available"}, {status: 400})
    }
    await db.del(`cat:${category}`)
    return NextResponse.json({ message: "Deleted Successfully" })
}