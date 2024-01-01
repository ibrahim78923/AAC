import { CANNED_RESPONSES, NOTISTACK_VARIANTS } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import {
  selectAgentDefaultValues,
  selectAgentSchema,
} from './SelectAgentsModal.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLazyGetAgentsQuery } from '@/services/dropdowns';

export const useSelectAgentsModal = (props: any) => {
  const {
    openSelectAgentsModal,
    closeSelectAgentsModal,
    setAgentsResponses,
    setValue,
  } = props;
  const apiQueryAgents = useLazyGetAgentsQuery();
  const method = useForm({
    defaultValues: selectAgentDefaultValues,
    resolver: yupResolver(selectAgentSchema),
  });
  const { watch }: any = method;
  const agents = watch(CANNED_RESPONSES?.AGENTS);
  const onSubmit = () => {
    setAgentsResponses(agents);
    enqueueSnackbar('Agents Selected!', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    closeSelectAgentsModal();
  };
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
