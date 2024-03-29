import { useTheme } from '@mui/material';
import { useFieldArray } from 'react-hook-form';

export const useWorkflowConditions = (props: any) => {
  const { control } = props;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'groups',
  });
  const handleAddGroup = () =>
    append({
      name: '',
      conditionType: null,
      conditions: [{ key: '', condition: '', value: null }],
    });
  const { palette } = useTheme();
  return { fields, append, remove, palette, handleAddGroup };
};
