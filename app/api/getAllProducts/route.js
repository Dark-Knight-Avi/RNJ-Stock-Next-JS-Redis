import { getAllProductKeys } from "@/app/helper/getAllProductKeys";
import { fetchredis } from "@/app/helper/redis";
import { NextResponse } from "next/server";

export async function GET(request) {
  const allProductKeys = await getAllProductKeys()
  const allProducts = []

  for(let i = 0; i < allProductKeys.length; i++) {
    const productValue = await fetchredis('smembers', allProductKeys[i])
    allProducts.push(JSON.parse(productValue))
  }

  return NextResponse.json({ type: 'all products', data: allProducts });
}
