import { db } from "../lib/db"
import { getAllProductKeys } from "./getAllProductKeys"
import { fetchredis } from "./redis"

export const getProductsByName = async (productName) => {
    const allProductKeys = await getAllProductKeys()
    const products = []
    for (const key of allProductKeys) {
        const product = await fetchredis('get', key)
        if (product.productName === productName) {
            products.push(product)
        }
    }
    return products.sort((a, b) => Number(a.size.split(' ')[0]) - Number(b.size.split(' ')[0]))
}