import { Skeleton } from "@/components/ui/skeleton";

const LoadingWorkspaces = () => {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col space-y-3 w-full">
        {/* Imagem */}
        <Skeleton className="h-[200px] w-full rounded-xl" />

        <div className="space-y-2">
          {/* Título */}
          <Skeleton className="h-4 w-[250px]" />

          {/* Linhas de texto */}
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[230px]" />

          {/* Footer com preço e botão */}
          <div className="flex items-center justify-between pt-4">
            <Skeleton className="h-5 w-[100px]" />
            <Skeleton className="h-10 w-[120px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingWorkspaces;
