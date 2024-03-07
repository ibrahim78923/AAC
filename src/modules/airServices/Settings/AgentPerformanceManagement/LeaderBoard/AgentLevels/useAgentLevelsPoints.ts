import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useAddAgentLevelsMutation,
  useGetAgentLevelsQuery,
} from '@/services/airServices/settings/agent-performance-management/leader-board/agent-levels';
import {
  agentLevelsFormDefaultValue,
  agentLevelsPointsSchema,
} from './AgentLevel.data';
import { useEffect } from 'react';
import { errorSnackbar, successSnackbar } from '@/utils/api';

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
      successSnackbar('Agent levels points added successfully!');
    } catch (error: any) {
      errorSnackbar();
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
