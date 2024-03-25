import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  filterWorkflowsValidationSchema,
  defaultValues,
} from './FilterWorkflow.data';
import { useLazyGetUsersDropdownListQuery } from '@/services/airServices/settings/user-management/departments';

export const useFilterWorkflow = () => {
  const methods = useForm({
    resolver: yupResolver(filterWorkflowsValidationSchema),
    defaultValues,
  });
  const { handleSubmit, watch } = methods;
  const userDropdown = useLazyGetUsersDropdownListQuery();
  const statusValue = watch('status');
  const createdByValue = watch('createdBy');
  return {
    handleSubmit,
    methods,
    userDropdown,
    statusValue,
    createdByValue,
  };
};
