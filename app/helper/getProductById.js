import { getAllProductKeys } from "./getAllProductKeys"
import { fetchredis } from "./redis"

export const getProductById = async (id) => {
    const allProductKeys = getAllProductKeys()
    for(const key of allProductKeys) {
        if(key.split(':')[1] === id) {
            return await fetchredis('get', key)
        }
    }
    return -1
}