import {
  useAddAirServicesSettingsLeaderBoardAgentLevelsMutation,
  useGetAirServicesSettingsLeaderBoardAgentLevelsQuery,
} from '@/services/airServices/settings/agent-performance-management/leader-board/agent-levels';
import {
  agentLevelsFormDefaultValue,
  agentLevelsPointsSchema,
} from './AgentLevel.data';
import { useEffect } from 'react';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useRouter } from 'next/router';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { ARRAY_INDEX } from '@/constants/strings';
import { useFormLib } from '@/hooks/useFormLib';
import { AIR_SERVICES } from '@/constants/routes';

export const useAgentLevelsPoints = () => {
  const router = useRouter();
  const [addAgentLevelsPointsTrigger, addAgentLevelsPointsStatus] =
    useAddAirServicesSettingsLeaderBoardAgentLevelsMutation();

  const { data, isLoading, isFetching, isError, refetch } =
    useGetAirServicesSettingsLeaderBoardAgentLevelsQuery(
      {},
      {
        refetchOnMountOrArgChange: true,
      },
    );

  const formLibProps = {
    validationSchema: agentLevelsPointsSchema,
    defaultValues: agentLevelsFormDefaultValue?.(),
  };

  const { handleSubmit, reset, methods } = useFormLib(formLibProps);

  const onSubmit = async (values: any) => {
    try {
      await addAgentLevelsPointsTrigger(values)?.unwrap();
      successSnackbar('Agent Levels Points Added Successfully!');
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };

  useEffect(() => {
    reset(() => agentLevelsFormDefaultValue(data?.data?.[ARRAY_INDEX?.ZERO]));
  }, [data, reset]);

  const handleCancelBtn = () =>
    router?.push({
      pathname: AIR_SERVICES?.AGENT_PERFORMANCE_MANAGEMENT_SETTINGS,
    });

  return {
    methods,
    onSubmit,
    handleSubmit,
    data,
    isLoading,
    isFetching,
    addAgentLevelsPointsStatus,
    router,
    isError,
    refetch,
    handleCancelBtn,
  };
};
