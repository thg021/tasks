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
  avatar?: Avatar | null;
};

export type Avatar = {
  id: string;
  userId: string;
  sex: string;
  earSize: string;
  hairStyle: string;
  eyeStyle: string;
  glassesStyle: string;
  noseStyle: string;
  mouthStyle: string;
  shirtStyle: string;
  hatStyle: string;
  eyeBrowStyle: string;
};
