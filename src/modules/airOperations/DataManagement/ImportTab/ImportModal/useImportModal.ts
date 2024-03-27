import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  importDefaultValues,
  importValidationSchema,
} from './ImportModal.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';

export const useImportModal = () => {
  const [csvFileData, setCsvFileData] = useState<any[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNewImport, setIsNewImport] = useState(true);
  const [modalStep, setModalStep] = useState(1);
  const [importLog, setImportLog] = useState('');

  const methodsImportModalForm = useForm<any>({
    resolver: yupResolver(importValidationSchema(modalStep)),
    defaultValues: importDefaultValues,
  });

  const product = methodsImportModalForm?.watch()?.product;
  const importDeals = methodsImportModalForm?.watch()?.importDeals;

  const { control } = methodsImportModalForm;
  const { fields } = useFieldArray({
    control,
    name: 'importedFields',
  });

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
    setImportLog('');
    methodsImportModalForm?.reset();
  };

  const resetImportModalForm = async () => {
    if (modalStep > 1) {
      setModalStep((prev) => --prev);
    } else handleClose();
  };

  const handleSelect = (selectedValue: any) => {
    setImportLog(selectedValue);
  };

  const handleFileChange = (event: any) => {
    if (event) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event?.target?.result) {
          const result: string = event?.target?.result?.toString();
          const lines = result?.split('\n');
          const headers = lines[0]?.split(',');
          const uniqueColumns = Array?.from(new Set(headers));
          const data = uniqueColumns?.map((column) => ({ column }));
          setCsvFileData(data);
        }
      };
      reader?.readAsText(event);
    }
  };

  const handlePreview = () => {
    if (importDeals) {
      const fileURL = URL?.createObjectURL(importDeals);
      window?.open(fileURL);
    }
  };

  useEffect(() => {
    const importedFiles = csvFileData?.map((item: any) => ({
      fileColumn: item?.column,
      crmFields: null,
    }));
    methodsImportModalForm?.setValue('importedFields', importedFiles);
  }, [csvFileData]);

  useEffect(() => {
    {
      importDeals != null && handleFileChange(importDeals);
    }
    {
      product === null && (methodsImportModalForm?.reset(), setImportLog(''));
    }
    {
      importDeals != null &&
        modalStep === 1 &&
        methodsImportModalForm?.setValue('importDeals', null);
    }
  }, [importDeals, product, importLog, modalStep]);

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
    fields,
    handlePreview,
  };
};
