import { getAllProductKeys } from "@/app/helper/getAllProductKeys";
import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const allProductKeys = await getAllProductKeys()
  const allProducts = []

  for (const key of allProductKeys) {
    const productValue = await db.get(key)
    allProducts.push(productValue)
  }

  return NextResponse.json({ type: 'all products', data: allProducts });
}
