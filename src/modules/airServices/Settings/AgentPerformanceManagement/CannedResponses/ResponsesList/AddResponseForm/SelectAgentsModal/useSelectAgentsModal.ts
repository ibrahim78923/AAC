import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import {
  AGENTS,
  selectAgentDefaultValues,
  selectAgentSchema,
} from './SelectAgentsModal.data';
import { yupResolver } from '@hookform/resolvers/yup';

export const useSelectAgentsModal = () => {
  const method = useForm({
    defaultValues: selectAgentDefaultValues,
    resolver: yupResolver(selectAgentSchema),
  });
  const { watch } = method;
  const agents = watch(AGENTS);
  const onSubmit = () => {
    enqueueSnackbar('Moved Successfully!', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };
  return {
    method,
    onSubmit,
    agents,
  };
};
