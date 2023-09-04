import { fetchfromredis } from "@/app/helper/rediscpy";
import { NextResponse } from "next/server";

export async function GET(request) {
    const allParameters = []

    const allParams = await fetchfromredis('get', 'custom-parameters')

    const allParamsArr = allParams.split(', ')
    for (const param of allParamsArr) {
        allParameters.push({ parameter: param })
    }

    return NextResponse.json({ type: 'all custom parameters', parameters: allParameters });
}
