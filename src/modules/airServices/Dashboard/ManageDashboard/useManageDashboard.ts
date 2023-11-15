import { useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { defaultValuesManageDashboard } from './ManageDashboardFilter/ManageDashboardFilter.data';
export const useManageDashboard = () => {
  const matches = useMediaQuery('(max-width:590px)');
  const [searchValue, SetSearchValue] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const methodsManageDashboardFilterForm = useForm({
    defaultValues: defaultValuesManageDashboard,
  });
  const submitManageDashboardFilterForm = async () => {
    setIsDrawerOpen(false);
  };
  const resetManageDashboardFilterForm = async () => {
    methodsManageDashboardFilterForm?.reset();
    setIsDrawerOpen(false);
  };
  return {
    matches,
    searchValue,
    SetSearchValue,
    isDrawerOpen,
    setIsDrawerOpen,
    resetManageDashboardFilterForm,
    submitManageDashboardFilterForm,
    methodsManageDashboardFilterForm,
  };
};
