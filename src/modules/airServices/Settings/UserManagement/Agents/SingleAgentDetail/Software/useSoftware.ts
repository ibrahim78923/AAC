import { useRouter } from 'next/router';
import { useGetAgentSoftwareDetailsQuery } from '@/services/airServices/settings/user-management/agents/details';
import { softwareColumnsDynamic } from './Software.data';

export const useSoftware = () => {
  const router = useRouter();
  const { agentId } = router?.query;
  const getAgentSoftwareDetailsParameter = {
    pathParams: {
      id: agentId,
    },
  };

  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetAgentSoftwareDetailsQuery(getAgentSoftwareDetailsParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!agentId,
    });

  const softwareColumns = softwareColumnsDynamic(router);
  return {
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    softwareColumns,
  };
};
