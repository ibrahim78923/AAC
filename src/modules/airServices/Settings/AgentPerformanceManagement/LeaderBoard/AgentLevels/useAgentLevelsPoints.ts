import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  useAddAgentLevelsMutation,
  useGetAgentLevelsQuery,
} from '@/services/airServices/settings/agent-performance-management/leader-board/agent-levels';
import {
  agentLevelsFormDefaultValue,
  agentLevelsPointsSchema,
} from './AgentLevel.data';
import { useEffect } from 'react';

export const useAgentLevelsPoints = () => {
  const [addAgentLevelsPointsTrigger, addAgentLevelsPointsStatus] =
    useAddAgentLevelsMutation();
  const { data, isLoading, isFetching } = useGetAgentLevelsQuery({});

  const agentLevelsPointsMethod: any = useForm({
    defaultValues: agentLevelsFormDefaultValue?.(),
    resolver: yupResolver(agentLevelsPointsSchema),
  });

  const { reset } = agentLevelsPointsMethod;
  const handleSubmit = async (values: any) => {
    try {
      await addAgentLevelsPointsTrigger(values)?.unwrap();
      enqueueSnackbar('Agent levels points added successfully!', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  useEffect(() => {
    reset(() => agentLevelsFormDefaultValue(data?.data?.[0]));
  }, [data, reset]);

  return {
    agentLevelsPointsMethod,
    handleSubmit,
    data,
    isLoading,
    isFetching,
    addAgentLevelsPointsStatus,
  };
};
