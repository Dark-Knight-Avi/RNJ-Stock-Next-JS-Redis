import { getAllProductKeys } from "./getAllProductKeys"

export const getProductById = async (id) => {
    const allProductKeys = getAllProductKeys()
    for(const key of allProductKeys) {
        if(key.split(':')[1] === id) {
            return await db.get(key)
        }
    }
    return -1
}