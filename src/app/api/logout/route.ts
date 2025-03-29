import { removeUser } from "@/lib/session";

export async function POST() {
  await removeUser();

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  });
}
