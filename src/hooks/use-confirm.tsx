import { useState } from 'react';
import { ResponsiveModal } from '@/components/responsive-modal';
import { Button, type ButtonProps } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export const useConfirm = (
  title: string,
  message: string,
  variant: ButtonProps['variant'] = 'default'
) => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () =>
    new Promise((resolve) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    if (promise) {
      promise.resolve(true);
      handleClose();
    }
  };

  const handleCancel = () => {
    if (promise) {
      promise.resolve(false);
      handleClose();
    }
  };

  const ConfirmationDialog = () => (
    <ResponsiveModal open={promise !== null} onOpenChange={handleClose}>
      <Card className="size-full border-none shadow-none">
        <CardContent className="pt-8">
          <CardHeader className="pt-0">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{message}</CardDescription>
          </CardHeader>
          <div className="flex w-full flex-col items-center justify-end gap-2 pt-4 lg:flex-row">
            <Button
              onClick={handleCancel}
              variant="outline"
              className="w-full lg:w-auto"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirm}
              variant={variant}
              className="w-full lg:w-auto"
            >
              Confirmar
            </Button>
          </div>
        </CardContent>
      </Card>
    </ResponsiveModal>
  );

  return [ConfirmationDialog, confirm] as const;
};
