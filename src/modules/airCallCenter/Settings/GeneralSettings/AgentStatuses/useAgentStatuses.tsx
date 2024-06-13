import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import dayjs from 'dayjs';
// import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  newAgentStatusValidationSchema,
  newAgentStatusDefaultValues,
} from './NewAgentStatus/NewAgentStatus.data';
import {
  editAgentStatusDefaultValues,
  editAgentStatusValidationSchema,
} from './EditAgentStatus/EditAgentStatus.data';
import { successSnackbar } from '@/utils/api';

const useBusinessHours = () => {
  // const [postAddFaq, { isLoading: loadingAddFaq }] = usePostFaqsMutation();
  const [openNewAgentStatus, setOpenNewAgentStatus] = useState(false);
  const methodsNewAgentStatus = useForm({
    resolver: yupResolver(newAgentStatusValidationSchema),
    defaultValues: newAgentStatusDefaultValues,
  });

  const {
    handleSubmit: handleMethodAddStatus,
    reset: resetNewAgentStatusForm,
  } = methodsNewAgentStatus;

  const handleOpenNewAgentStatus = () => {
    setOpenNewAgentStatus(true);
  };
  const handleCloseNewAgentStatus = () => {
    setOpenNewAgentStatus(false);
    resetNewAgentStatusForm();
  };

  const onSubmitNewAgentStatus = async () => {
    successSnackbar('Agent Status added successfully');
    handleCloseNewAgentStatus();
  };
  const handleNewAgentStatusSubmit = handleMethodAddStatus(
    onSubmitNewAgentStatus,
  );

  const [openEditAgentStatus, setOpenEditAgentStatus] = useState(false);
  const methodsEditAgentStatus = useForm({
    resolver: yupResolver(editAgentStatusValidationSchema),
    defaultValues: editAgentStatusDefaultValues,
  });

  const { handleSubmit: handleMethodAddFaq, reset: reseteditAgentStatusForm } =
    methodsEditAgentStatus;

  const handleOpenEditAgentStatus = () => {
    setOpenEditAgentStatus(true);
  };
  const handleCloseEditAgentStatus = () => {
    setOpenEditAgentStatus(false);
    reseteditAgentStatusForm();
  };

  const onSubmitEditAgentStatus = async () => {
    successSnackbar('Agent Status updated successfully');
    handleCloseEditAgentStatus();
  };
  const handleEditAgentStatusSubmit = handleMethodAddFaq(
    onSubmitEditAgentStatus,
  );

  return {
    openNewAgentStatus,
    handleOpenNewAgentStatus,
    handleCloseNewAgentStatus,
    methodsNewAgentStatus,
    handleNewAgentStatusSubmit,

    openEditAgentStatus,
    methodsEditAgentStatus,
    handleOpenEditAgentStatus,
    handleCloseEditAgentStatus,
    handleEditAgentStatusSubmit,
  };
};

export default useBusinessHours;
