import Feed from "@/components/Feed";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default function Home() {
  const token = cookies().get("fb-at");
  if (!token) {
    redirect("/register");
  }

  return (
    <main className="w-[60rem]">
      <Feed />
    </main>
  );
}
