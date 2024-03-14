import { useGetSingleAgentDetailsQuery } from '@/services/airServices/settings/user-management/agents/details';
import { useRouter } from 'next/router';

export const useAgentBioData = () => {
  const router = useRouter();
  const { agentId } = router?.query;
  const getSingleAgentDetailsParameter = {
    pathParams: {
      id: agentId,
    },
  };

  const { data, isLoading, isFetching, isError } =
    useGetSingleAgentDetailsQuery(getSingleAgentDetailsParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!agentId,
    });

  return {
    data,
    isLoading,
    isFetching,
    isError,
  };
};
