import { salesWorkflowsFilterValues } from './FilterSalesWorkflow.data';
import { useState } from 'react';
import { useLazyGetAdminUserDropdownListQuery } from '@/services/airOperations/workflow-automation/sales-workflow';
import { getSession } from '@/utils';
import { FilterSalesWorkflowI } from './FilterSalesWorkflow.interface';
import { useFormLib } from '@/hooks/useFormLib';

export const useFilterSalesWorkflow = (props: FilterSalesWorkflowI) => {
  const { setIsFilterOpen, handleWorkflow } = props;
  const filterMethodProps = {
    defaultValues: salesWorkflowsFilterValues,
  };
  const [buttonCalled, setButtonCalled] = useState(false);
  const { handleSubmit, reset, watch, methods } = useFormLib(filterMethodProps);
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
    methods,
    userDropdown,
    handleReset,
    buttonCalled,
    statusValue,
    createdByValue,
    typeValue,
    sessionUserData,
  };
};
