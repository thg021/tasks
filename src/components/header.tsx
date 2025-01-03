'use client';
import { MoveLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle } from './ui/card';

type HeaderProps = {
  title: string;
};
export const Header = ({ title }: HeaderProps) => {
  return (
    <Card className="size-full border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-start gap-x-4">
        <Button variant="secondary" onClick={() => window.history.back()}>
          <MoveLeft className="size-4" />
        </Button>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
    </Card>
  );
};
