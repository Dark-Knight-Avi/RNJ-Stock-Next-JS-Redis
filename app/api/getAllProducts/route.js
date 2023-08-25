import { getAllProductKeys } from "@/app/helper/getAllProductKeys";
import { fetchredis } from "@/app/helper/redis";
import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const allProductKeys = await getAllProductKeys()
  const allProducts = []

  for (const key of allProductKeys) {
    const productValue = await fetchredis('get', key)
    allProducts.push(productValue)
  }

  return NextResponse.json({ type: 'all products', data: allProducts });
}
