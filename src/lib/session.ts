import { cookies } from "next/headers";

export const getUser = async () => {
    const jar = await cookies();
    const user = jar.get("user")?.value || null;    
    return user;
}

export const setUser = async (user: string) => {
    const jar = await cookies();
    jar.set("user", user, { path: "/", expires: new Date(Date.now() + 60 * 60 * 24 * 1000 * 100) });
}

export const removeUser = async () => {
    const jar = await cookies();
    jar.delete("user");
}
