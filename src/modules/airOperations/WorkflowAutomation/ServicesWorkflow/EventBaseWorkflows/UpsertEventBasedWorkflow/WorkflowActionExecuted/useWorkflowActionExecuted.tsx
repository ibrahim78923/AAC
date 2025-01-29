import useAuth from '@/hooks/useAuth';
import { errorSnackbar } from '@/lib/snackbar';
import {
  useLazyGetAgentsDropDownInWorkflowQuery,
  useLazyGetAssetTypeInWorkflowQuery,
  useLazyGetCategoriesDropdownInWorkflowQuery,
  useLazyGetDepartmentDropdownInWorkflowQuery,
  useLazyGetLocationsDropdownInWorkflowQuery,
  useLazyGetUsersListDropdownInWorkflowQuery,
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
  const auth: any = useAuth();
  const { _id: productId } = auth?.product ?? {};

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
  const agentApiQuery = useLazyGetAgentsDropDownInWorkflowQuery();
  const departmentApiQuery = useLazyGetDepartmentDropdownInWorkflowQuery();
  const apiQueryCategories = useLazyGetCategoriesDropdownInWorkflowQuery();
  const apiQueryLocations = useLazyGetLocationsDropdownInWorkflowQuery();
  const apiUsersListDropdown = useLazyGetUsersListDropdownInWorkflowQuery();
  const apiAssetType = useLazyGetAssetTypeInWorkflowQuery();

  return {
    fields,
    append,
    remove,
    theme,
    handleDelete,
    agentApiQuery,
    departmentApiQuery,
    apiQueryCategories,
    apiQueryLocations,
    apiUsersListDropdown,
    productId,
    apiAssetType,
  };
};
