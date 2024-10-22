import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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

export const useAgentLevelsPoints = () => {
  const router = useRouter();
  const [addAgentLevelsPointsTrigger, addAgentLevelsPointsStatus] =
    useAddAirServicesSettingsLeaderBoardAgentLevelsMutation();

  const { data, isLoading, isFetching } =
    useGetAirServicesSettingsLeaderBoardAgentLevelsQuery({});

  const agentLevelsPointsMethod: any = useForm({
    defaultValues: agentLevelsFormDefaultValue?.(),
    resolver: yupResolver(agentLevelsPointsSchema),
  });

  const { reset, handleSubmit } = agentLevelsPointsMethod;

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

  return {
    agentLevelsPointsMethod,
    onSubmit,
    handleSubmit,
    data,
    isLoading,
    isFetching,
    addAgentLevelsPointsStatus,
    router,
  };
};
