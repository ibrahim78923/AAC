import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  importDefaultValues,
  importValidationSchema,
} from './ImportModal.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useImportModal = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNewImport, setIsNewImport] = useState(true);
  const [modalStep, setModalStep] = useState(1);

  const [importLog, setImportLog] = useState('');
  const handleSelect = (selectedValue: any) => {
    setImportLog(selectedValue);
  };

  const methodsImportModalForm: any = useForm<any>({
    resolver: yupResolver(importValidationSchema),
    defaultValues: importDefaultValues,
  });
  const product = methodsImportModalForm?.watch()?.product;
  const importDeals = methodsImportModalForm?.watch()?.importDeals;

  useEffect(() => {
    if (product === null) {
      setImportLog('');
    }
  }, [product]);
  const { handleSubmit, reset } = methodsImportModalForm;
  const submitImportModalForm = async () => {
    try {
      if (modalStep < 3) {
        setModalStep((prev) => ++prev);
      } else {
        successSnackbar('File has been Imported');
        handleClose();
        reset();
      }
    } catch (error: any) {
      errorSnackbar(error?.message);
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
    handleSelect,
    importLog,
    product,
    handleSubmit,
    importDeals,
  };
};
