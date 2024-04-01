import {
  useLazyGetCategoriesDropdownQuery,
  useLazyGetDepartmentDropdownQuery,
} from '@/services/airServices/tickets';
import { useLazyGetAgentsQuery } from '@/services/dropdowns';
import { errorSnackbar } from '@/utils/api';
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
    fields?.map((index: any) => `actions.${index}.fieldName`),
  );
  useEffect(() => {
    fields?.forEach((index: any) => {
      setValue(`actions.${index}.fieldValue`, null);
    });
  }, [operatorsOption]);
  const agentApiQuery = useLazyGetAgentsQuery();
  const departmentApiQuery = useLazyGetDepartmentDropdownQuery();
  const apiQueryCategories = useLazyGetCategoriesDropdownQuery();
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
