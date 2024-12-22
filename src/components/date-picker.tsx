'use client';
import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { PopoverClose } from '@radix-ui/react-popover';

type DatePickerProps = {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  className?: string;
  placeholder?: string;
  openInModal?: boolean;
};

export const DatePicker = ({
  value,
  onChange,
  className,
  placeholder = 'Selecione uma data',
  openInModal = true
}: DatePickerProps) => {
  return (
    <Popover modal={openInModal}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className={cn(
            'w-full justify-start px-3 text-left font-normal',
            !value && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {value ? format(value, 'dd/MM/yyyy') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col p-2" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => onChange(date as Date)}
          initialFocus
        />
        <div className="flex items-center justify-between">
          <PopoverClose className="w-fit text-sm">
            Fechar
            <span className="sr-only">Fechar</span>
          </PopoverClose>
          <Button variant="default" onClick={() => onChange(undefined)} className="ml-auto">
            Limpar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
