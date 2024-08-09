import { useForm } from 'react-hook-form';
import { salesWorkflowsFilterValues } from './FilterSalesWorkflow.data';
import { useState } from 'react';
import { useLazyGetAdminUserDropdownListQuery } from '@/services/airOperations/workflow-automation/sales-workflow';
import { getSession } from '@/utils';
import { FilterSalesWorkflowI } from './FilterSalesWorkflow.interface';

export const useFilterSalesWorkflow = (props: FilterSalesWorkflowI) => {
  const { setIsFilterOpen, handleWorkflow } = props;
  const filterMethod = useForm({
    defaultValues: salesWorkflowsFilterValues,
  });
  const [buttonCalled, setButtonCalled] = useState(false);
  const { handleSubmit, reset, watch } = filterMethod;
  const userDropdown = useLazyGetAdminUserDropdownListQuery();
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
  const sessionUserData = getSession()?.user;
  return {
    handleSubmit,
    filterMethod,
    userDropdown,
    handleReset,
    buttonCalled,
    statusValue,
    createdByValue,
    typeValue,
    sessionUserData,
  };
};
