import type { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';
import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const createStatusProjectApi = client.api.projects[':projectId']['status']['$post'];

type ResponseTypeGET = InferResponseType<
  (typeof client.api.projects)[':projectId']['status']['$get'],
  200
>;
type CreateStatusProject = typeof createStatusProjectApi;

type ResponseType = InferResponseType<CreateStatusProject, 201>['data'];
type RequestType = InferRequestType<CreateStatusProject>;

export const useCreateStatusProject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await createStatusProjectApi({
        json,
        param
      });

      if (!response.ok) {
        throw new Error('Erro ao criar workspace!');
      }

      const { data } = await response.json();
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<ResponseTypeGET>(['status', data.projectId], (oldData) => {
        if (!oldData) return undefined;
        return {
          data: [...oldData?.data, data]
        };
      });
      toast.success('status criado com sucesso!');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Erro ao criar status para o projeto!');
    }
  });

  return mutation;
};
