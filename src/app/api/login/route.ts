import { setUser } from "@/lib/session";

export async function POST(request: Request) {
    const { email } = await request.json();
    
    if (!email) {
        return new Response("Email is required", { status: 400 });
    }

    await setUser(email);

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/",
        },
    })
}
