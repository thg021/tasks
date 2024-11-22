import { MobileSidebar } from '@/components/mobile-sidebar';
import { UserButton } from '@/features/auth/components/user-button';

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 pt-4">
      <div className="hidden flex-col lg:flex ">
        <h1 className="text-22xl font-semibold ">Home</h1>
        <p className="text-muted-foreground">
          Monitore todos os seus projetos e tarefas aqui
        </p>
      </div>
      <MobileSidebar />
      <UserButton />
    </nav>
  );
};
