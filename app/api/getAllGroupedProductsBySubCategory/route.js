import { getAllProductKeys } from "@/app/helper/getAllProductKeys";
import { fetchredis } from "@/app/helper/redis";
import { NextResponse } from 'next/server';

export const POST = async (request) => {
    try {
        let isCustom = false
        let { subCategory } = await request.json();
        subCategory = subCategory.toLowerCase()
        if (!subCategory || subCategory.length === 0) {
            return NextResponse.json({ error: 'Invalid Subcategory' }, { status: 400 });
        }
        const allProductKeys = await getAllProductKeys()
        const allSubCategoryKeys = allProductKeys.filter((key) => key.toLowerCase().split(':')[3] === subCategory.split(' ').join('-'))
        console.log("All Subcategory Keys:", allSubCategoryKeys);
        if (allSubCategoryKeys.length === 0) {
            return NextResponse.json({ error: 'No products found for this subcategory' }, { status: 404 });
        }
        const products = []
        const visited = []
        for (const key of allSubCategoryKeys) {
            const product = await fetchredis('get', key)
            if (!visited.includes(product.productName)) {
                products.push([product])
                visited.push(product.productName)
            } else {
                products[visited.indexOf(product.productName)].push(product)
            }
        }
        if(products[0][0].hasOwnProperty('parameter')){
            isCustom = true
        }
        return NextResponse.json({ type: 'Products by subcategory', isCustom, products});
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: `An error occurred: ${error}` }, { status: 500 });
    }
};
