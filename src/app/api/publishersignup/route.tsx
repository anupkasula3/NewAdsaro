import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("mybody",JSON.stringify(body));
       
        const response = await fetch(`https://panel.adsaro.com/admin/api/Publisher/?version=4&userToken=1wDtEkEz2ykyOdyx`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(body.data),
        });

        const data = await response.json();
        console.log("donedata",data)
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch datas"}, { status: 500 });
    }
}
