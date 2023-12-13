import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useFieldArray } from 'react-hook-form';

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
  const { palette } = useTheme();
  return {
    fields,
    append,
    palette,
    handleDeleteClick,
  };
};
