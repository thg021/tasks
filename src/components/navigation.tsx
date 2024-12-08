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
                  'group flex items-center gap-2.5 rounded-md p-2.5 font-medium text-slate-500 transition hover:text-primary hover:text-slate-900',
                  isActive && 'bg-neutral-200 text-primary shadow-sm hover:opacity-100'
                )}
              >
                <Icon
                  className={cn(
                    'size-5 text-slate-500 group-hover:text-slate-900',
                    isActive && 'text-slate-900'
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
