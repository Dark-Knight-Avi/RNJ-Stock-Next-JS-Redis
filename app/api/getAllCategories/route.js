import { getAllCategoryKeys } from "@/app/helper/getAllCategoryKeys";
import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";
const fetchData = async (command, ...args) => {
  try {
    return await db[command](...args);
  } catch (error) {
    console.error("Error executing Redis command:", error);
    throw error;
  }
}
export async function GET(request) {
  const allCategoryKeys = await getAllCategoryKeys()
  const allCategories = []

  for(const key of allCategoryKeys) {
    const categoryValue = await fetchData('get', key)
    allCategories.push(categoryValue)
  }

  return NextResponse.json({ type: 'all categories', data: allCategories });
}
