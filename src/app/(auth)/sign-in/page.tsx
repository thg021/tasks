import { getUserCurrentSession } from "@/features/auth/action";
import { SignInCard } from "@/features/auth/components/sign-in-card";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const user = await getUserCurrentSession({ redirect: false });
  if (user) redirect("/");
  return <SignInCard />;
}
