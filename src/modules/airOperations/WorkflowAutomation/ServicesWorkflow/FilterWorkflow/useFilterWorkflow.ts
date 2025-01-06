import {
  filterWorkflowsValidationSchema,
  defaultValues,
} from './FilterWorkflow.data';
import { useLazyGetUsersDropdownListQuery } from '@/services/airServices/settings/user-management/departments';
import { useState } from 'react';
import { PAGINATION } from '@/config';
import { useFormLib } from '@/hooks/useFormLib';

export const useFilterWorkflow = (props: any) => {
  const { handleWorkflow, setIsDrawerOpen, setPage } = props;
  const [buttonCalled, setButtonCalled] = useState<boolean>(false);
  const filterMethodProps = {
    validationSchema: filterWorkflowsValidationSchema,
    defaultValues,
  };
  const { handleSubmit, watch, reset, methods } = useFormLib(filterMethodProps);
  const userDropdown = useLazyGetUsersDropdownListQuery();
  const handleReset = async () => {
    setButtonCalled(true);
    reset();
    await handleWorkflow();
    setIsDrawerOpen(false);
    setButtonCalled(false);
    setPage(PAGINATION?.CURRENT_PAGE);
  };
  const statusValue = watch('status');
  const createdByValue = watch('createdBy');
  return {
    handleSubmit,
    methods,
    userDropdown,
    statusValue,
    createdByValue,
    buttonCalled,
    handleReset,
  };
};
