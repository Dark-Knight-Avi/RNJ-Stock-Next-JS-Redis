import { getAllCategoryKeys } from "@/app/helper/getAllCategoryKeys";
import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const allCategoryKeys = await getAllCategoryKeys()
  const allCategories = []

  for(const key of allCategoryKeys) {
    const categoryValue = await db.get(key)
    allCategories.push(categoryValue)
  }

  return NextResponse.json({ type: 'all categories', data: allCategories });
}
