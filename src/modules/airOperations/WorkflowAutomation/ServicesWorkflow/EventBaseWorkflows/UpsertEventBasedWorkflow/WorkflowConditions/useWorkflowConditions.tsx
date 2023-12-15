import { useTheme } from '@mui/material';
import { useFieldArray } from 'react-hook-form';
import { eventBasedWorkflowValues } from '../UpsertEventBasedWorkflow.data';

export const useWorkflowConditions = (props: any) => {
  const { control } = props;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'workflowConditions',
  });
  const handleAddGroup = () =>
    append(eventBasedWorkflowValues?.workflowConditions[0]);
  const { palette } = useTheme();
  return { fields, append, remove, palette, handleAddGroup };
};
