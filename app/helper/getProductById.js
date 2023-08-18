import { db } from "../lib/db"
import { getAllProductKeys } from "./getAllProductKeys"

export const getProductById = async (id) => {
    const allProductKeys = await getAllProductKeys()
    const productKey = allProductKeys.filter((key) => key.split(':')[1] === id)
    if(productKey.length === 0) {
        return -1
    }
    const product = await db.get(productKey.toString())
    return product
}