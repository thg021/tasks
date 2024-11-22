import { useSession } from 'next-auth/react';

export const useClientCurrentUser = () => {
  const { data } = useSession({ required: true });
  return data?.user;
};
