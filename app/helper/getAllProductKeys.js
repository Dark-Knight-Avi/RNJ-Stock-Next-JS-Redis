import { db } from "../lib/db";

export const getAllProductKeys = async () => {
    const allProductKeys = await db.keys("pdt:*");


    return allProductKeys
}