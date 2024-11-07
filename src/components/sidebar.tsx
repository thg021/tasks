import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Navigation } from "@/components/navigation";

export const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={32} height={32} />
      </Link>
      <Separator className="my-6" />
      <Navigation />
    </aside>
  );
};