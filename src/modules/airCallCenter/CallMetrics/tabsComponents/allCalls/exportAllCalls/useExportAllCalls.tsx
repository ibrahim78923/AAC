import { useForm } from 'react-hook-form';

import { successSnackbar } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';

import { useState } from 'react';
import {
  exportAsDefaultValues,
  exportAsValidationSchema,
} from './exportAs.data';

export const useExportAllCalls = (props: any) => {
  const { isExportDrawerOpen, setIsExportDrawerOpen } = props;
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any>([]);
  const methodExport = useForm({
    resolver: yupResolver(exportAsValidationSchema),
    defaultValues: exportAsDefaultValues,
  });
  const { handleSubmit } = methodExport;
  const onSubmit = async () => {
    setIsExportDrawerOpen?.(false);
    successSnackbar('File Exported Successfully');
  };

  const cancelExport = async () => {
    setIsExportDrawerOpen?.(false);
  };

  return {
    methodExport,
    handleSubmit,
    onSubmit,
    cancelExport,
    selectedCheckboxes,
    setSelectedCheckboxes,
    isExportDrawerOpen,
    setIsExportDrawerOpen,
  };
};
