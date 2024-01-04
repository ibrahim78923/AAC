import { useTheme } from '@mui/material';
import { useFieldArray } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { salesValues } from '../UpsertSalesWorkflow.data';

export const useWorkflowConditions = (props: any) => {
  const { control } = props;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'workflowConditions',
  });
  const handleAddGroup = () => {
    if (fields.length < 5) {
      append(salesValues?.workflowConditions[0]);
    } else {
      enqueueSnackbar('Group limit exceeds', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  const { palette } = useTheme();
  return { fields, append, remove, palette, handleAddGroup };
};
