import Image from 'next/image';
import Link from 'next/link';

export default function StandaloneLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex h-[73px] items-center justify-between">
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
