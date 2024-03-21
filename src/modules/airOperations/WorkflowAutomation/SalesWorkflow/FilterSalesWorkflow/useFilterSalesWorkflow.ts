import { useForm } from 'react-hook-form';
import { salesWorkflowsFilterValues } from './FilterSalesWorkflow.data';
import { useLazyGetUsersDropdownListQuery } from '@/services/airServices/settings/user-management/departments';

export const useFilterSalesWorkflow = () => {
  const filterMethod = useForm({
    defaultValues: salesWorkflowsFilterValues,
  });
  const { handleSubmit, watch } = filterMethod;
  const userDropdown = useLazyGetUsersDropdownListQuery();
  const statusValue = watch('status');
  const createdByValue = watch('createdBy');
  return {
    handleSubmit,
    filterMethod,
    userDropdown,
    statusValue,
    createdByValue,
  };
};
