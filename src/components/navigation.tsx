'use client';

import { GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill } from 'react-icons/go';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { map } from 'lodash';
import { SettingsIcon, UserIcon } from 'lucide-react';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { cn } from '@/lib/utils';

const routes = [
  {
    label: 'Início',
    href: '',
    icon: GoHome,
    activeIcon: GoHomeFill
  },
  {
    label: 'Tarefas',
    href: '/tasks',
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill
  },
  {
    label: 'Configurações',
    href: '/settings',
    icon: SettingsIcon,
    activeIcon: SettingsIcon
  },
  {
    label: 'Equipe',
    href: '/members',
    icon: UserIcon,
    activeIcon: UserIcon
  }
];

export const Navigation = () => {
  const workspaceId = useWorkspaceId();
  const pathName = usePathname();
  return (
    <ul className="flex flex-col">
      {map(routes, (route) => {
        const { label, icon, activeIcon, href } = route;
        const fullHref = `/workspaces/${workspaceId}${href}`;
        const isActive = pathName === fullHref;
        const Icon = isActive ? activeIcon : icon;
        return (
          <li key={href}>
            <Link href={fullHref}>
              <div
                className={cn(
                  'group flex items-center gap-2.5 rounded-md p-2.5 font-medium text-neutral-500 transition hover:text-neutral-900 hover:text-primary dark:text-neutral-200 dark:hover:text-neutral-500',
                  isActive &&
                    'bg-neutral-200 text-primary shadow-sm hover:opacity-100 dark:bg-neutral-800'
                )}
              >
                <Icon
                  className={cn(
                    'size-5 text-neutral-500 group-hover:text-neutral-900 dark:text-neutral-200 dark:group-hover:text-neutral-500',
                    isActive && 'text-neutral-900'
                  )}
                />
                <span className="text-sm">{label}</span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
