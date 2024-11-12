import Image from "next/image";
import Link from "next/link";

export default function StandaloneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center h-[73px]">
          <Link href="/" className="text-2xl font-semibold">
            <Image src="/logo.svg" alt="logo" width={34} height={34} />
          </Link>
        </nav>
        <div className="flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
