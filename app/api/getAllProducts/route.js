import { fetchredis } from "@/app/helper/redis";
import { db } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Fetch all keys matching the pattern "pdt:*"
    const keysResponse = await db.keys('pdt:*');
    const productKeys = keysResponse.map((key) => key.slice(4)); // Remove "pdt:" prefix

    const products = [];

    // Fetch values for each product key
    for (const productKey of productKeys) {
      const productValue = await fetchredis('get', `pdt:${productKey}`);
      products.push(productValue);
    }
    return NextResponse.json({ type: 'All Products', products })
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An error occurred while fetching products.' });
  }
}
