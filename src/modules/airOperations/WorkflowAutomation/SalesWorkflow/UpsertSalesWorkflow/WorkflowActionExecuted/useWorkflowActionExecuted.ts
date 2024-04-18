import { useEffect } from 'react';
import { useTheme } from '@mui/material';
import { useFieldArray } from 'react-hook-form';
import { salesValues } from '../UpsertSalesWorkflow.data';
import { errorSnackbar, warningSnackbar } from '@/utils/api';
import {
  useLazyGetContactDropdownListQuery,
  useLazyGetDealDropdownListQuery,
  useLazyGetUserDropdownListQuery,
} from '@/services/airOperations/workflow-automation/sales-workflow';

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
      append(salesValues?.actions);
    } else {
      errorSnackbar('Action limit exceeds');
    }
  };
  const { palette } = useTheme();
  const dealsDropdown = useLazyGetDealDropdownListQuery();
  const contactDropdown = useLazyGetContactDropdownListQuery();
  const userDropdown = useLazyGetUserDropdownListQuery();
  const moduleType = watch('module');
  useEffect(() => {
    fields?.forEach((_, index) => {
      setValue(`actions.${index}.fieldName`, null);
      setValue(`actions.${index}.fieldValue`, null);
    });
  }, [moduleType]);
  return {
    fields,
    handleAppend,
    palette,
    handleDeleteClick,
    dealsDropdown,
    contactDropdown,
    userDropdown,
  };
};
