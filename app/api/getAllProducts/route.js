import { fetchredis } from "@/app/helper/redis";
import { fetchfromredis } from "@/app/helper/rediscpy";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { page } = await request.json(); // Extract 'page' from the request body
    const productsPerPage = 10;
    const pattern = 'pdt:*'; // Pattern to match keys
    let cursor = '0'; // Initial cursor

    const products = [];
    let productsCount = 0;

    do {
      const scanResult = await fetchfromredis('scan', cursor, 'MATCH', pattern);
      cursor = scanResult[0];
      const matchingKeys = scanResult[1];

      // Fetch values for each matching key using the 'matchingKeys' array
      for (const key of matchingKeys) {
        if (productsCount >= (page - 1) * productsPerPage && productsCount < page * productsPerPage) {
          const productValue = await fetchredis('get', key);
          products.push(productValue); // Assuming 'productValue' is a JSON-parsed string
        }
        productsCount++;
      }
    } while (cursor !== '0' && productsCount < page * productsPerPage); // Continue until cursor becomes '0' or reached desired page products

    return NextResponse.json({ type: 'Page Products', page, products });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An error occurred while fetching products.' });
  }
}
