import { getCurrent } from "@/features/auth/action";
import { UserButton } from "@/features/auth/components/user-button";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");
  return (
    <div className="flex flex-col">
      <div>
        <UserButton />
      </div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
