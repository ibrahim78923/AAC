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

export const useAgentLevelsPoints = () => {
  const [addAgentLevelsPoints] = useAddAgentLevelsMutation();
  const { data: agentLevelsPoints = {} } = useGetAgentLevelsQuery({});

  const agentLevelsPointsMethod: any = useForm({
    defaultValues: agentLevelsFormDefaultValue,
    resolver: yupResolver(agentLevelsPointsSchema),
  });

  const handleSubmit = async (values: any) => {
    try {
      await addAgentLevelsPoints(values)?.unwrap();
      enqueueSnackbar('Agent levels points added successfully!', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const handleSetValues = () => {
    Object?.entries(agentLevelsPoints)?.map(
      ([key, value]) => agentLevelsPointsMethod?.setValue(key, value),
    );
  };

  return {
    agentLevelsPointsMethod,
    handleSubmit,
    agentLevelsPoints,
    handleSetValues,
  };
};
