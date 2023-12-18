import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  scheduledWorkflowSchema,
  scheduledWorkflowValues,
} from './UpsertScheduledWorkflow.data';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useUpsertScheduledWorkflow = () => {
  const scheduledWorkflowMethod = useForm({
    defaultValues: scheduledWorkflowValues,
    resolver: yupResolver(scheduledWorkflowSchema),
  });
  const { reset, watch, register, handleSubmit, setValue, control } =
    scheduledWorkflowMethod;
  const handleFormSubmit = () => {
    enqueueSnackbar('Workflow Enabled Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    reset();
  };
  const { palette } = useTheme();
  const moduleType = watch('moduleType');
  return {
    scheduledWorkflowMethod,
    handleFormSubmit,
    register,
    handleSubmit,
    palette,
    moduleType,
    setValue,
    watch,
    control,
  };
};
