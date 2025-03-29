// src/app/(authenticated)/layout.tsx
import { getUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div>
      <header>{/* Add your header content here */}</header>
      <main>{children}</main>
      <footer>{/* Add your footer content here */}</footer>
    </div>
  );
}
