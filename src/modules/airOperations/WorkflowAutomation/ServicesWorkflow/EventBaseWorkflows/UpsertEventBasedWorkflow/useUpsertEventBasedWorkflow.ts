import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  eventBasedWorkflowSchema,
  eventBasedWorkflowValues,
} from './UpsertEventBasedWorkflow.data';
import { useTheme } from '@mui/material';
import { usePostServicesWorkflowMutation } from '@/services/airOperations/workflow-automation/services-workflow';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useUpsertEventBasedWorkflow = () => {
  const eventMethod = useForm({
    defaultValues: eventBasedWorkflowValues,
    resolver: yupResolver(eventBasedWorkflowSchema),
  });
  const { reset, watch, register, handleSubmit, setValue, control } =
    eventMethod;
  const [postWorkflowTrigger] = usePostServicesWorkflowMutation();
  const handleFormSubmit = async (data: any) => {
    try {
      await postWorkflowTrigger(data).unwrap();
      successSnackbar('Workflow Enabled Successfully');
    } catch (error) {
      errorSnackbar();
    }
    reset();
  };
  const { palette } = useTheme();
  const moduleType = watch('module');
  return {
    eventMethod,
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
