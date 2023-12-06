import { CANNED_RESPONSES, NOTISTACK_VARIANTS } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import {
  selectAgentDefaultValues,
  selectAgentSchema,
} from './SelectAgentsModal.data';
import { yupResolver } from '@hookform/resolvers/yup';

export const useSelectAgentsModal = (props: any) => {
  const { openSelectAgentsModal, closeSelectAgentsModal, setAgentsResponses } =
    props;
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
  };
};
