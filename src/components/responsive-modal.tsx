'use-client';
import { useMedia } from 'react-use';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
type ResponsiveModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
};

export const ResponsiveModal = ({
  children,
  onOpenChange,
  open
}: ResponsiveModalProps) => {
  const isDesktop = useMedia('(min-width: 1024px)', true);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTitle>{''}</DialogTitle>
        <DialogContent
          aria-describedby="Criar novo workspace"
          aria-description="Description of the dialog"
          className="p-o hide-scrollbar max-h-[85vh] w-full overflow-y-auto border-none sm:max-w-lg"
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
        <div className="hide-scrollbar max-h-[85vh] overflow-y-auto">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
