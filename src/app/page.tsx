"use client";

import { Button } from "@/components/ui/button";
import { useCurrent } from "@/features/auth/api/use-current";
import { useLogout } from "@/features/auth/api/use-logout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data, isLoading } = useCurrent();
  const router = useRouter();
  const { mutate } = useLogout();
  useEffect(() => {
    if (!data && !isLoading) {
      router.push("/sign-in");
    }
  }, [data, isLoading, router]);
  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <h1>Pagina para logado</h1>
        <Button onClick={() => mutate()}>Logout</Button>
      </div>

      {isLoading && <p>Carregando...</p>}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
