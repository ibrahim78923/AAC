import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useFieldArray } from 'react-hook-form';
import { salesValues } from '../UpsertSalesWorkflow.data';

export const useWorkflowActionExecuted = () => {
  const { fields, append, remove } = useFieldArray({
    name: 'actionsExecuted',
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
      append(salesValues?.actionsExecuted);
    } else {
      enqueueSnackbar('Action limit exceeds', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  const { palette } = useTheme();
  return {
    fields,
    handleAppend,
    palette,
    handleDeleteClick,
  };
};
