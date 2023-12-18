import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const useImportModal = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNewImport, setIsNewImport] = useState(true);
  const [modalStep, setModalStep] = useState(1);

  const methodsImportModalForm = useForm({
    // defaultValues,
  });

  const submitImportModalForm = async () => {
    if (modalStep < 3) {
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
    setModalStep(1);
    methodsImportModalForm?.reset();
  };

  const resetImportModalForm = async () => {
    if (modalStep > 1) {
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
  };
};
