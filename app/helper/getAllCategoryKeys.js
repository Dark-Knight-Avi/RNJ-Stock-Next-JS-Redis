import { db } from "../lib/db";

export const getAllCategoryKeys = async () => {
    const allCategoryKeys = await db.keys("cat:*");

    return allCategoryKeys
}