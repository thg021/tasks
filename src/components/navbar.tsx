'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { MobileSidebar } from '@/components/mobile-sidebar';
import { UserButton } from '@/features/auth/components/user-button';
import { Button } from './ui/button';

// Types
interface RouteContent {
  title: string;
  description: string;
}

// Constants
const ROUTES = {
  BASE: {
    workspaces: {
      title: 'Home',
      description: 'Monitore todos os seus projetos e tarefas aqui'
    },
    settings: {
      title: 'Configurações',
      description: 'Gerencie as configurações do seu workspaces'
    },
    default: {
      title: 'Home',
      description: 'Monitore todos os seus projetos e tarefas aqui'
    }
  },
  PROJECTS: {
    project: {
      title: 'Projeto',
      description: 'Informações sobre seu projeto'
    },
    projects: {
      title: 'Projetos',
      description: 'Informações dos seus projetos'
    },
    settings: {
      title: 'Configurações',
      description: 'Configurações do seu projeto'
    },
    default: {
      title: 'Projeto',
      description: ''
    }
  },
  TASKS: {
    default: {
      title: 'Tarefas',
      description: ''
    },
    task: {
      title: 'Tarefa',
      description: 'Gerencie sua tarefa'
    },
    tasks: {
      title: 'Tarefas',
      description: 'Gerencie suas tarefas'
    }
  },
  MEMBERS: {
    default: {
      title: 'Equipe',
      description: ''
    },
    edit: {
      title: 'Editar',
      description:
        'editar as informações do usuário. Nesta seção você pode adicionar ou remover os projetos que o usuário tem acesso.'
    },
    members: {
      title: 'Equipe',
      description: 'Gerencie sua equipe'
    },
    member: {
      title: 'Membro',
      description: ''
    }
  }
} as const;

// Utility functions
const getPathSegments = (pathname: string): string[] => pathname.split('/').filter(Boolean);

const getRouteContent = (pathname: string): RouteContent => {
  const segments = getPathSegments(pathname);
  const segmentCount = segments.length;

  if (pathname.includes('projects')) {
    const isSpecificProject = segmentCount === 4;
    const route = isSpecificProject
      ? 'project'
      : segments.findLast((segment) => Object.keys(ROUTES.PROJECTS).includes(segment)) || 'default';

    return ROUTES.PROJECTS[route as keyof typeof ROUTES.PROJECTS];
  }

  if (pathname.includes('tasks')) {
    const isSpecificTask = segmentCount === 4;
    const route = isSpecificTask
      ? 'task'
      : segments.findLast((segment) => Object.keys(ROUTES.TASKS).includes(segment)) || 'default';
    return ROUTES.TASKS[route as keyof typeof ROUTES.TASKS];
  }

  if (pathname.includes('member')) {
    const isSpecificTask = segmentCount === 4;
    const route = isSpecificTask
      ? 'member'
      : segments.findLast((segment) => Object.keys(ROUTES.MEMBERS).includes(segment)) || 'default';
    return ROUTES.MEMBERS[route as keyof typeof ROUTES.MEMBERS];
  }

  const route =
    segments.findLast((segment) => Object.keys(ROUTES.BASE).includes(segment)) || 'default';
  return ROUTES.BASE[route as keyof typeof ROUTES.BASE];
};

const getPreviousUrl = (pathname: string): string => {
  const segments = getPathSegments(pathname);
  return segments.length <= 1 ? '/' : `/${segments.slice(0, -1).join('/')}`;
};

// Components
interface BackButtonProps {
  onClick: () => void;
}

const BackButton = ({ onClick }: BackButtonProps) => (
  <Button onClick={onClick} variant="secondary" className="hover:bg-gray-100">
    <ChevronLeft className="size-6" />
  </Button>
);

interface NavContentProps {
  title: string;
  description: string;
}

const NavContent = ({ title, description }: NavContentProps) => (
  <div className="hidden flex-col lg:flex">
    <h1 className="text-xl font-semibold">{title}</h1>
    <p className="text-xs text-muted-foreground">{description}</p>
  </div>
);

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { title, description } = getRouteContent(pathname);
  const showBackButton = getPathSegments(pathname).length > 2;

  const handleBack = () => {
    router.push(getPreviousUrl(pathname));
  };

  return (
    <nav className="flex items-center justify-between px-6 pt-4">
      <div className="flex items-center gap-4">
        {showBackButton && <BackButton onClick={handleBack} />}
        <NavContent title={title} description={description} />
      </div>
      <div className="flex items-center gap-4">
        <MobileSidebar />
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
