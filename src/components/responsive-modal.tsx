'use-client';
import { useMedia } from 'react-use';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
type ResponsiveModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  maximize?: boolean;
  children: React.ReactNode;
};

export const ResponsiveModal = ({
  children,
  onOpenChange,
  open,
  maximize = false
}: ResponsiveModalProps) => {
  const isDesktop = useMedia('(min-width: 1024px)', true);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTitle>{''}</DialogTitle>

        <DialogContent
          aria-describedby="Criar novo workspace"
          aria-description="Description of the dialog"
          className={cn(
            'left-[50%] top-[50%] h-auto max-h-[85vh] max-w-lg translate-x-[-50%] translate-y-[-50%] overflow-y-auto sm:max-w-lg sm:rounded-lg',
            'hide-scrollbar',
            maximize &&
              'bottom-0 left-0 right-0 top-0 h-screen max-h-full w-screen max-w-full translate-x-0 translate-y-0 border-none p-0 transition-all duration-300 ease-in-out sm:max-w-full sm:rounded-none'
          )}
        >
          {children}
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent
        aria-describedby="Criar novo workspace"
        aria-description="Description of the dialog"
      >
        <div className="hide-scrollbar max-h-[85vh] overflow-y-auto">{children}</div>
      </DrawerContent>
    </Drawer>
  );
};
