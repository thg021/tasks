import { cn } from "@/lib/utils";
import { map } from "lodash";
import { SettingsIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";

const routes = [
  {
    label: "Início",
    href: "/",
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
  return (
    <ul className="flex flex-col">
      {map(routes, (route) => {
        const { label, icon, activeIcon, href } = route;
        const isActive = false;
        const Icon = isActive ? activeIcon : icon;
        return (
          <li key={href}>
            <Link href={href}>
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
