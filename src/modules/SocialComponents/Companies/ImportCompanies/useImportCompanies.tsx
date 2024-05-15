import { useState } from 'react';
import { useTheme } from '@mui/material';
import useToggle from '@/hooks/useToggle';
import { useForm } from 'react-hook-form';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useImportFileMutation } from '@/services/airServices/global/import';
import { CRM_COLUMNS } from './importCompanies.data';
import { FIELD_TYPES } from '@/constants/strings';

const useImportCompanies = (setIsDrawerOpen: any) => {
  const theme = useTheme();
  const [isToggled, toggle] = useToggle();
  const [filePath, setFilePath] = useState();

  const [importFileTrigger, importFileStatus] = useImportFileMutation?.();

  const methods = useForm({});
  const { handleSubmit } = methods;

  const onSubmit = async () => {};

  const setDrawerDefaultState = () => {
    setIsDrawerOpen?.(false);
  };

  const filterMandatoryFields = () => {
    return CRM_COLUMNS?.filter(
      (column: any) => column?.groupBy === FIELD_TYPES?.MANDATORY_FIELD,
    );
  };

  const submitImport = async (apiData: any) => {
    const apiImportData = {
      body: {
        filePath: apiData?.filePath,
        actionType: 'COMPANIES',
        dataColumn: apiData?.dataColumn,
      },
    };
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
    filePath,
    filterMandatoryFields,
  };
};

export default useImportCompanies;
