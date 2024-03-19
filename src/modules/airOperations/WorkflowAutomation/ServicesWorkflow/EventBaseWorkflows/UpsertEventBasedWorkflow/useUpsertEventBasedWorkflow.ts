import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  eventBasedWorkflowSchema,
  eventBasedWorkflowValues,
} from './UpsertEventBasedWorkflow.data';
import { useTheme } from '@mui/material';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { usePostServicesWorkflowMutation } from '@/services/airOperations/workflow-automation/services-workflow';
import { useRouter } from 'next/router';
import { AIR_OPERATIONS } from '@/constants';

export const useUpsertEventBasedWorkflow = () => {
  const router = useRouter();
  const movePage = () => {
    router.push({
      pathname: AIR_OPERATIONS?.SERVICES_WORKFLOW,
    });
  };
  const eventMethod = useForm({
    defaultValues: eventBasedWorkflowValues,
    resolver: yupResolver(eventBasedWorkflowSchema),
  });
  const { reset, watch, register, handleSubmit, setValue, control } =
    eventMethod;
  const [postWorkflowTrigger] = usePostServicesWorkflowMutation();
  const handleFormSubmit = async (data: any) => {
    // const { options , ...rest } = data;
    const body = {
      // ...rest,
      events: [data?.events?.value],
      runType: data?.runType?.value,
      groups:
        data?.groups?.map((group: any) => ({
          ...group,
          conditionType: group?.conditionType?.value,
        })) ?? [],
    };
    try {
      await postWorkflowTrigger(body).unwrap();
      successSnackbar('Workflow Enabled Successfully');
      reset();
      movePage();
    } catch (error) {
      errorSnackbar();
    }
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
