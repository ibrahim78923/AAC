import { useForm } from 'react-hook-form';
import { salesWorkflowsFilterValues } from './FilterSalesWorkflow.data';
import { useLazyGetUsersDropdownListQuery } from '@/services/airServices/settings/user-management/departments';
import { useState } from 'react';

export const useFilterSalesWorkflow = (props: any) => {
  const { setIsFilterOpen, handleWorkflow } = props;
  const filterMethod = useForm({
    defaultValues: salesWorkflowsFilterValues,
  });
  const [buttonCalled, setButtonCalled] = useState(false);
  const { handleSubmit, reset, watch } = filterMethod;
  const userDropdown = useLazyGetUsersDropdownListQuery();
  const handleReset = async () => {
    setButtonCalled(true);
    reset();
    await handleWorkflow();
    setIsFilterOpen(false);
    setButtonCalled(false);
  };
  const statusValue = watch('status');
  const createdByValue = watch('createdBy');
  const typeValue = watch('type');
  return {
    handleSubmit,
    filterMethod,
    userDropdown,
    handleReset,
    buttonCalled,
    statusValue,
    createdByValue,
    typeValue,
  };
};
