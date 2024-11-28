import { useParams } from 'next/navigation';

export const useParamProjectId = () => {
  const params = useParams();
  return params.projectId as string;
};