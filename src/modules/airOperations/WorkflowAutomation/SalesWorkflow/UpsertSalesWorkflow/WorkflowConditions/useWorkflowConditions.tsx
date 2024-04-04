import { useTheme } from '@mui/material';
import { useFieldArray } from 'react-hook-form';
import { errorSnackbar } from '@/utils/api';

export const useWorkflowConditions = (props: any) => {
  const { control } = props;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'groups',
  });
  const handleAddGroup = () => {
    if (fields.length < 5) {
      append({
        name: '',
        conditionType: null,
        conditions: [{ fieldName: '', condition: '', fieldValue: null }],
      });
    } else {
      errorSnackbar('Group limit exceeds');
    }
  };
  const { palette } = useTheme();
  return { fields, append, remove, palette, handleAddGroup };
};
