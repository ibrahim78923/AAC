import { CANNED_RESPONSES, NOTISTACK_VARIANTS } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import {
  selectAgentDefaultValues,
  selectAgentSchema,
} from './SelectAgentsModal.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLazyGetAgentsQuery } from '@/services/dropdowns';
import { useEffect } from 'react';

export const useSelectAgentsModal = (props: any) => {
  const {
    openSelectAgentsModal,
    closeSelectAgentsModal,
    setAgentsResponses,
    agentsDetails,
    setValue,
  } = props;

  const apiQueryAgents = useLazyGetAgentsQuery();
  const method = useForm({
    defaultValues: selectAgentDefaultValues(agentsDetails),
    resolver: yupResolver(selectAgentSchema),
  });
  const { watch, reset }: any = method;
  const agents = watch(CANNED_RESPONSES?.AGENTS);
  const mergeUniqueObjects = (agentsDetails: any, agents: any) => {
    const uniqueAgents = new Map();
    agentsDetails?.forEach((agent: any) => {
      const key = JSON?.stringify(agent);
      uniqueAgents?.set(key, agent);
    });
    agents?.forEach((agent: any) => {
      const key = JSON?.stringify(agent);
      if (!uniqueAgents?.has(key)) {
        uniqueAgents?.set(key, agent);
      }
    });
    const mergedAgents = Array.from(uniqueAgents?.values());

    return mergedAgents;
  };
  const onSubmit = () => {
    setAgentsResponses(mergeUniqueObjects(agentsDetails, agents));
    enqueueSnackbar('Agents Selected!', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    closeSelectAgentsModal();
  };
  useEffect(() => {
    reset(selectAgentDefaultValues(agentsDetails));
  }, [openSelectAgentsModal]);
  return {
    method,
    onSubmit,
    agents,
    openSelectAgentsModal,
    closeSelectAgentsModal,
    apiQueryAgents,
    setValue,
  };
};
