import { fetchredis } from "@/app/helper/redis";
import { fetchfromredis } from "@/app/helper/rediscpy";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const cursor = '0'; // Initial cursor
    const pattern = 'pdt:*'; // Pattern to match keys

    const scanResult = await fetchfromredis('scan', cursor, 'MATCH', pattern);
    console.log(scanResult)
    const matchingKeys = scanResult[1];

    const products = [];

    // Fetch values for each matching key using the 'matchingKeys' array
    for (const key of matchingKeys) {
      const productValue = await fetchredis('get', key);
      products.push(productValue); // Assuming 'productValue' is a JSON-parsed string
    }

    return NextResponse.json({ type: 'All Products', products });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An error occurred while fetching products.' });
  }
}
