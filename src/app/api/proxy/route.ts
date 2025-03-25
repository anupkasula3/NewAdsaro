import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {token } = body; 

       
        const response = await fetch(`https://panel.adsaro.com/publisher/api/Campaign/?version=4&token=${token}&range=0-10`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}


export async function PUT(req: Request) {
    try {
        const { storedToken, data } = await req.json(); 

        const response = await fetch(`https://panel.adsaro.com/publisher/api/Account/216346?version=4&token=${storedToken}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email ,
                company: data.company ,
                phone: data?.phone,
                password_current: data?.password_current,
                password_repeat	: data?.password_repeat	,
                password: data?.password,
            }),
        });

        const updatedData = await response.json();
        if (!response.ok) {
            // Handle API validation errors
            return NextResponse.json(
                { error: updatedData.message || "Validation error occurred" },
                { status: response.status }
            );
        }
        return NextResponse.json(updatedData);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update data" }, { status: 500 });
    }
}