import { fetchfromredis } from "@/app/helper/rediscpy";
import { db } from "@/app/lib/db";
import { NextResponse } from 'next/server';

export async function POST(req, res) {
    try {

        const { parameter } = await req.json();

        if (!parameter) {
            return NextResponse.json({ error: "parameter is required" }, { status: 400 });
        }
        const customParams = await fetchfromredis('get', 'custom-parameters')

        const allCustomParams = customParams.split(', ')
        if (allCustomParams.includes(parameter)) {
            return new Response("This parameter is already added", {
                status: 400,
            });
        }

        // Store the product in Redis
        const newParams = customParams === '' ? parameter : customParams + ', ' + parameter
        await db.set(`custom-parameters`, newParams);
        const updatedParams = await fetchfromredis('get', 'custom-parameters')
        return NextResponse.json({ message: "Parameter added successfully", updatedParams }, { status: 200 });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}
