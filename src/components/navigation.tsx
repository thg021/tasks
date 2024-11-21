"use client";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import { map } from "lodash";
import { SettingsIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";

const routes = [
  {
    label: "Início",
    href: "",
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    label: "Tarefas",
    href: "/tasks",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "Configurações",
    href: "/settings",
    icon: SettingsIcon,
    activeIcon: SettingsIcon,
  },
  {
    label: "Equipe",
    href: "/members",
    icon: UserIcon,
    activeIcon: UserIcon,
  },
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
                  "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500 hover:text-neutral-900",
                  isActive &&
                    "bg-white shadow-sm hover:opacity-100 text-primary"
                )}
              >
                <Icon
                  className={cn(
                    "size-5 text-neutral-500 hover:text-neutral-900"
                  )}
                />
                <span>{label}</span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
