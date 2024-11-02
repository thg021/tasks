"use client";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isSignPage = pathname === "/sign-in";
  return (
    <main className="min-h-screen bg-neutral-100">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex items-center justify-between">
          <Image src="./logo.svg" alt="Logo" width={32} height={32} />

          <Button variant="ghost" asChild>
            <Link href={isSignPage ? "/sign-up" : "/sign-in"}>
              {isSignPage ? "Criar nova conta" : "Fazer login"}
            </Link>
          </Button>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
}
