import { useParams } from 'next/navigation';

export const useMemberIdParams = () => {
  const params = useParams();
  return params.memberId as string;
};
