import { useState } from 'react';
import { useTheme } from '@mui/material';
import useToggle from '@/hooks/useToggle';
import { useGetSignedUrlForImportQuery } from '@/services/commonFeatures/companies';
import { useForm } from 'react-hook-form';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useImportFileMutation } from '@/services/airServices/global/import';

const useImportCompanies = (setIsDrawerOpen: any) => {
  const theme = useTheme();
  const [isToggled, toggle] = useToggle();
  const [filePath, setFilePath] = useState();

  const { data: getSignedUrlForImport } = useGetSignedUrlForImportQuery({
    objectUrl: filePath,
  });
  const [importFileTrigger, importFileStatus] = useImportFileMutation?.();
  const data = getSignedUrlForImport?.data;

  const methods = useForm({});
  const { handleSubmit } = methods;

  const onSubmit = async () => {};

  const setDrawerDefaultState = () => {
    setIsDrawerOpen?.(false);
  };

  const submitImport = async (apiData: any) => {
    const apiImportData = {
      body: {
        filePath: apiData?.filePath,
        actionType: 'COMPANIES',
        dataColumn: apiData?.dataColumn,
      },
    };

    return;
    try {
      const response: any = await importFileTrigger?.(apiImportData)?.unwrap();
      successSnackbar(response?.message);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    setDrawerDefaultState,
    importFileStatus,
    submitImport,
    handleSubmit,
    isToggled,
    onSubmit,
    methods,
    theme,
    setFilePath,
    toggle,
    data,
  };
};

export default useImportCompanies;
