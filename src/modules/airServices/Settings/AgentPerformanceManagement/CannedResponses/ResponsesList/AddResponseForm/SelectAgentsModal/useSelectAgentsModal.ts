import { CANNED_RESPONSES } from '@/constants/strings';
import { useForm } from 'react-hook-form';
import {
  selectAgentDefaultValues,
  selectAgentSchema,
} from './SelectAgentsModal.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { successSnackbar } from '@/utils/api';
import { useLazyGetAirServicesSettingsCannedResponseAgentsQuery } from '@/services/airServices/settings/agent-performance-management/canned-responses';
import useAuth from '@/hooks/useAuth';

export const useSelectAgentsModal = (props: any) => {
  const {
    openSelectAgentsModal,
    closeSelectAgentsModal,
    setAgentsResponses,
    agentsDetails,
    setValue,
  } = props;

  const auth: any = useAuth();

  const productId = auth?.product?._id ?? {};

  const apiQueryAgents =
    useLazyGetAirServicesSettingsCannedResponseAgentsQuery();
  const method = useForm({
    defaultValues: selectAgentDefaultValues(agentsDetails),
    resolver: yupResolver(selectAgentSchema),
  });

  const { watch, reset }: any = method;
  const selectedAgentsList = watch(CANNED_RESPONSES?.AGENTS);

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
    setAgentsResponses(mergeUniqueObjects(agentsDetails, selectedAgentsList));
    successSnackbar('Agents Selected!');
    closeSelectAgentsModal();
  };

  useEffect(() => {
    reset(selectAgentDefaultValues(agentsDetails));
  }, [openSelectAgentsModal]);

  return {
    method,
    onSubmit,
    selectedAgentsList,
    openSelectAgentsModal,
    closeSelectAgentsModal,
    apiQueryAgents,
    setValue,
    productId,
  };
};
