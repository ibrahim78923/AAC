import { useEffect } from 'react';
import { useTheme } from '@mui/material';
import { useFieldArray } from 'react-hook-form';
import { errorSnackbar, warningSnackbar } from '@/utils/api';
import {
  useLazyGetAdminUserDropdownListQuery,
  useLazyGetDealDropdownListQuery,
  useLazyGetLifeCycleStagesDropdownListQuery,
  useLazyGetUserDropdownListQuery,
} from '@/services/airOperations/workflow-automation/sales-workflow';
import { useRouter } from 'next/router';

export const useWorkflowActionExecuted = (props: any) => {
  const { watch, setValue } = props;
  const { fields, append, remove } = useFieldArray({
    name: 'actions',
  });
  const handleDeleteClick = (index: any) => {
    if (fields?.length <= 1) {
      warningSnackbar('Cannot delete this action');
      return;
    }
    if (fields?.length >= 2) {
      remove?.(index);
    }
  };
  const handleAppend = () => {
    if (fields?.length < 5) {
      append({ fieldName: null, fieldValue: null });
    } else {
      errorSnackbar('Action limit exceeds');
    }
  };
  const { palette } = useTheme();
  const dealsDropdown = useLazyGetDealDropdownListQuery();
  const userDropdown = useLazyGetUserDropdownListQuery();
  const stagesDropdown = useLazyGetLifeCycleStagesDropdownListQuery();
  const adminUserDropdown = useLazyGetAdminUserDropdownListQuery();
  const router = useRouter();
  const moduleType = watch('module');
  if (router?.query?.id === undefined) {
    useEffect(() => {
      fields?.forEach((_, index) => {
        setValue(`actions.${index}.fieldName`, null);
        setValue(`actions.${index}.fieldValue`, null);
      });
    }, [moduleType]);
  }
  return {
    fields,
    handleAppend,
    palette,
    handleDeleteClick,
    dealsDropdown,
    userDropdown,
    stagesDropdown,
    adminUserDropdown,
  };
};
