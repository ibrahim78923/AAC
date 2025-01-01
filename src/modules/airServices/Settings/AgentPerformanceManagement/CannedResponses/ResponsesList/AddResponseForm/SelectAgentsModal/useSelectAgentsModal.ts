import { CANNED_RESPONSES } from '@/constants/strings';
import {
  selectAgentDefaultValues,
  selectAgentSchema,
} from './SelectAgentsModal.data';
import { useEffect } from 'react';
import { successSnackbar } from '@/lib/snackbar';
import { useLazyGetAirServicesSettingsCannedResponseAgentsQuery } from '@/services/airServices/settings/agent-performance-management/canned-responses';
import useAuth from '@/hooks/useAuth';
import { useFormLib } from '@/hooks/useFormLib';

export const useSelectAgentsModal = (props: any) => {
  const {
    openSelectAgentsModal,
    setAgentsResponses,
    agentsDetails,
    setOpenSelectAgentsModal,
  } = props;

  const auth: any = useAuth();

  const productId = auth?.product?._id ?? {};

  const apiQueryAgents =
    useLazyGetAirServicesSettingsCannedResponseAgentsQuery();

  const formLibProps = {
    validationSchema: selectAgentSchema,
    defaultValues: selectAgentDefaultValues(agentsDetails),
  };

  const { watch, reset, methods, handleSubmit } = useFormLib(formLibProps);

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

  const closeModal = () => setOpenSelectAgentsModal(false);

  const onSubmit = () => {
    setAgentsResponses(mergeUniqueObjects(agentsDetails, selectedAgentsList));
    successSnackbar('Agents Selected!');
    closeModal();
  };

  useEffect(() => {
    reset(selectAgentDefaultValues(agentsDetails));
  }, [openSelectAgentsModal]);

  return {
    methods,
    onSubmit,
    selectedAgentsList,
    openSelectAgentsModal,
    apiQueryAgents,
    productId,
    handleSubmit,
    closeModal,
  };
};
