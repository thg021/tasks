import { UserButton } from "@/features/auth/components/user-button";
import { MobileSidebar } from "@/components/mobile-sidebar";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between pt-4 px-6">
      <div className="flex-col hidden lg:flex ">
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
