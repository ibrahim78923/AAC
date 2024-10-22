import { errorSnackbar } from '@/lib/snackbar';
import {
  useLazyGetAgentsDropDownInWorkflowQuery,
  useLazyGetCategoriesDropdownInWorkflowQuery,
  useLazyGetDepartmentDropdownInWorkflowQuery,
} from '@/services/airOperations/workflow-automation/services-workflow';
import { useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';

export const useWorkflowActionExecuted = (props: any) => {
  const { watch, setValue } = props;
  const { fields, append, remove } = useFieldArray({
    name: 'actions',
  });
  const theme = useTheme();

  const handleDelete = (index: number) => {
    if (fields?.length === 1) {
      errorSnackbar('Cannot Delete');
    } else {
      remove(index);
    }
  };
  const operatorsOption = watch(
    fields.map((index: any) => `actions.${index}.key`),
  );
  useEffect(() => {
    fields?.forEach((index: any) => {
      setValue(`actions.${index}.value`, null);
    });
  }, [operatorsOption]);
  const agentApiQuery = useLazyGetAgentsDropDownInWorkflowQuery();
  const departmentApiQuery = useLazyGetDepartmentDropdownInWorkflowQuery();
  const apiQueryCategories = useLazyGetCategoriesDropdownInWorkflowQuery();
  return {
    fields,
    append,
    remove,
    theme,
    handleDelete,
    agentApiQuery,
    departmentApiQuery,
    apiQueryCategories,
  };
};
