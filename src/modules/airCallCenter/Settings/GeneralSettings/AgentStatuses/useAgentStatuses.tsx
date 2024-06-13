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
  const [text, setText] = useState('');
  const methodsNewAgentStatus = useForm({
    resolver: yupResolver(newAgentStatusValidationSchema),
    defaultValues: newAgentStatusDefaultValues,
  });
  const [newAgentAdded, setNewAgentAdded] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);
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
    setNewAgentAdded(true);
    setText('');
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
  const [newStatusAdded, setNewStatusAdded] = useState(false);

  const handleOpenEditNewAgentStatus = () => {
    setOpenEditAgentStatus(true);
    setNewStatusAdded(true);
  };
  const handleOpenEditAgentStatus = () => {
    setOpenEditAgentStatus(true);
    setNewStatusAdded(false);
  };
  const handleCloseEditAgentStatus = () => {
    setOpenEditAgentStatus(false);
    reseteditAgentStatusForm();
  };

  const onSubmitEditAgentStatus = async () => {
    successSnackbar('Agent Status updated successfully');
    setText('');
    handleCloseEditAgentStatus();
  };
  const handleEditAgentStatusSubmit = handleMethodAddFaq(
    onSubmitEditAgentStatus,
  );
  const handleCloseAlertModal = () => {
    setOpenAlertModal(false);
  };
  const handleDeleteAgentStatus = () => {
    successSnackbar('Agent Status deleted successfully');
    setOpenAlertModal(false);
    setNewAgentAdded(false);
  };

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
    newAgentAdded,
    openAlertModal,
    handleCloseAlertModal,
    handleDeleteAgentStatus,
    setOpenAlertModal,
    handleOpenEditNewAgentStatus,
    newStatusAdded,
    text,
    setText,
  };
};

export default useBusinessHours;
