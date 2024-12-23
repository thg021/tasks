import Image from 'next/image';
import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import { ProjectsNavigation } from '@/components/projects-navigation';
import { Separator } from '@/components/ui/separator';
import { WorkspaceSwitcher } from '@/features/workspaces/components/workspace-switcher';

export const Sidebar = () => {
  return (
    <aside className="size-full bg-neutral-100 p-4 dark:dark:bg-neutral-900">
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={24} height={24} />
      </Link>
      <Separator className="my-6" />
      <WorkspaceSwitcher />
      <Separator className="my-6" />
      <Navigation />
      <Separator className="my-6" />
      <ProjectsNavigation />
    </aside>
  );
};
