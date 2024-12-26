import type { Project } from './Project';

export type User = {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  projects: Project[];
};
