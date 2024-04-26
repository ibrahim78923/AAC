import { useRouter } from 'next/router';
import { useGetAgentTaskDetailsQuery } from '@/services/airServices/settings/user-management/agents/details';
import { tasksColumnsDynamic } from './Tasks.data';

export const useTasks = () => {
  const router = useRouter();
  const { agentId } = router?.query;
  const getAgentTaskDetailsParameter = {
    queryParams: {
      userIds: agentId,
    },
  };

  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetAgentTaskDetailsQuery(getAgentTaskDetailsParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!agentId,
    });

  const tasksColumns = tasksColumnsDynamic(router);
  return {
    data,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    tasksColumns,
  };
};
