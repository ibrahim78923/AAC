import { useForm } from 'react-hook-form';
import { salesWorkflowsFilterValues } from './FilterSalesWorkflow.data';
import { useLazyGetUsersDropdownListQuery } from '@/services/airServices/settings/user-management/departments';

export const useFilterSalesWorkflow = () => {
  const filterMethod = useForm({
    defaultValues: salesWorkflowsFilterValues,
  });
  const { handleSubmit } = filterMethod;
  const userDropdown = useLazyGetUsersDropdownListQuery();
  return {
    handleSubmit,
    filterMethod,
    userDropdown,
  };
};
