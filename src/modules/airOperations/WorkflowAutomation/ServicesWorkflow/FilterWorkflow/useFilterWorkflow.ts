import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  filterWorkflowsValidationSchema,
  defaultValues,
} from './FilterWorkflow.data';
import { useLazyGetUsersDropdownListQuery } from '@/services/airServices/settings/user-management/departments';
import { useState } from 'react';

export const useFilterWorkflow = (props: any) => {
  const { handleWorkflow, setIsDrawerOpen } = props;
  const [buttonCalled, setButtonCalled] = useState(false);
  const methods = useForm({
    resolver: yupResolver(filterWorkflowsValidationSchema),
    defaultValues,
  });
  const { handleSubmit, watch, reset } = methods;
  const userDropdown = useLazyGetUsersDropdownListQuery();
  const handleReset = async () => {
    setButtonCalled(true);
    reset();
    await handleWorkflow();
    setIsDrawerOpen(false);
    setButtonCalled(false);
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
