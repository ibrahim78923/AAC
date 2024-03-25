import { useEffect } from 'react';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useFieldArray } from 'react-hook-form';
import { salesValues } from '../UpsertSalesWorkflow.data';
import {
  useLazyGetContactDropdownListQuery,
  useLazyGetDealDropdownListQuery,
  useLazyGetProductsDropdownListQuery,
} from '@/services/airOperations/workflow-automation/sales-workflow';

export const useWorkflowActionExecuted = (props: any) => {
  const { watch, setValue } = props;
  const { fields, append, remove } = useFieldArray({
    name: 'actions',
  });
  const handleDeleteClick = (index: any) => {
    if (fields?.length <= 1) {
      enqueueSnackbar('Cannot delete this action', {
        variant: NOTISTACK_VARIANTS?.WARNING,
      });
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
      enqueueSnackbar('Action limit exceeds', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  const { palette } = useTheme();
  const dealsDropdown = useLazyGetDealDropdownListQuery();
  const contactDropdown = useLazyGetContactDropdownListQuery();
  const productDropdown = useLazyGetProductsDropdownListQuery();
  const moduleType = watch('module');
  useEffect(() => {
    fields?.forEach((_, index) => {
      setValue(`actions.${index}.key`, '');
      setValue(`actions.${index}.value`, '');
    });
  }, [moduleType]);
  return {
    fields,
    handleAppend,
    palette,
    handleDeleteClick,
    dealsDropdown,
    contactDropdown,
    productDropdown,
  };
};
