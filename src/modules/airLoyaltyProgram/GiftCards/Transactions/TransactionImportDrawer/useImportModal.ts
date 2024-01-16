import { IMPORT_ACTIONS_STEPS, NOTISTACK_VARIANTS } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const useImportModal = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNewImport, setIsNewImport] = useState(true);
  const [modalStep, setModalStep] = useState(IMPORT_ACTIONS_STEPS?.STEP_ONE);

  const methodsImportModalForm = useForm({});

  const submitImportModalForm = async () => {
    if (modalStep < IMPORT_ACTIONS_STEPS?.STEP_THREE) {
      setModalStep((prev) => ++prev);
    } else {
      enqueueSnackbar('File has been Imported', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      handleClose();
    }
  };
  const handleClose = () => {
    setIsDrawerOpen(false);
    setModalStep(IMPORT_ACTIONS_STEPS?.STEP_ONE);
    methodsImportModalForm?.reset();
  };

  const resetImportModalForm = async () => {
    if (modalStep > IMPORT_ACTIONS_STEPS?.STEP_ONE) {
      setModalStep((prev) => --prev);
    } else handleClose();
  };

  return {
    isDrawerOpen,
    setIsDrawerOpen,
    methodsImportModalForm,
    submitImportModalForm,
    resetImportModalForm,
    isNewImport,
    setIsNewImport,
    modalStep,
    handleClose,
    setModalStep,
  };
};
