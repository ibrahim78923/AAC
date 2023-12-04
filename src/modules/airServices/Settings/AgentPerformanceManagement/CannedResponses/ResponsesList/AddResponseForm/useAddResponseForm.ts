import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  AVAILABLE_FOR,
  SELECT_AGENTS,
  addResponseDefaultValues,
  addResponseValidationSchema,
} from './AddResponseForm.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useAddResponseForm = (props: any) => {
  const { open, setDrawerOpen } = props;
  const methodsAddResponseForm = useForm<any>({
    resolver: yupResolver(addResponseValidationSchema),
    defaultValues: addResponseDefaultValues,
  });
  const { handleSubmit, watch } = methodsAddResponseForm;
  const submitAddResponse = async () => {
    enqueueSnackbar('Moved Successfully!', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };
  const [openSelectAgentsModal, setOpenSelectAgentsModal] = useState(false);
  const [agents, setAgents] = useState<any>([]);
  const availableForChanged = watch(AVAILABLE_FOR);
  useEffect(() => {
    if (watch(AVAILABLE_FOR) === SELECT_AGENTS) {
      setOpenSelectAgentsModal(true);
    }
  }, [availableForChanged]);
  return {
    methodsAddResponseForm,
    handleSubmit,
    submitAddResponse,
    agents,
    setAgents,
    setOpenSelectAgentsModal,
    openSelectAgentsModal,
    open,
    setDrawerOpen,
  };
};
