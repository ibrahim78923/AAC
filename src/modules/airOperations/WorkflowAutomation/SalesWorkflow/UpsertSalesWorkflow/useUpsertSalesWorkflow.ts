import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  salesSchema,
  salesValues,
  workflowTypes,
} from './UpsertSalesWorkflow.data';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import {
  usePostSalesWorkflowMutation,
  usePostSaveDraftWorkflowMutation,
} from '@/services/airOperations/workflow-automation/sales-workflow';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT, TIME_FORMAT } from '@/constants';

export const useUpsertSalesWorkflow = () => {
  const { back } = useRouter();
  const salesMethod = useForm({
    defaultValues: salesValues,
    resolver: yupResolver(salesSchema),
  });
  const { reset, watch, handleSubmit, setValue, control } = salesMethod;
  const scheduleType = watch('type');
  const [postSalesWorkflowTrigger, { isLoading }] =
    usePostSalesWorkflowMutation();
  const [postSaveDraftWorkflowTrigger, { isLoading: saveDraftLoading }] =
    usePostSaveDraftWorkflowMutation();
  const handleFormSubmit = async (data: any) => {
    const successSnackbarMessage =
      scheduleType === workflowTypes?.eventBase
        ? 'Workflow Enabled Successfully'
        : 'Workflow Saved as Draft Successfully';
    const time = dayjs(data?.time)?.format(TIME_FORMAT?.API);
    const modifiedData = {
      title: data?.title,
      module: data?.module,
      type: data?.type,
      runType: data?.runType?.value,
      schedule: {
        type: data?.schedule?.toUpperCase(),
        daily: {
          time: time,
        },
        weekly: {
          days: [data?.scheduleDay?.toUpperCase()],
          time: time,
        },
        monthly: {
          day: Number(dayjs(data?.scheduleDate)?.format(DATE_TIME_FORMAT?.D)),
          time: time,
        },
        annually: {
          month: dayjs(data?.scheduleMonth)
            ?.format(DATE_TIME_FORMAT?.MMMM)
            ?.toLowerCase(),
          time: time,
        },
        custom: {
          startDate: data?.custom?.startDate,
          endDate: data?.custom?.endDate,
          time: time,
        },
      },
      events: [data?.events?.value],
      groups:
        data?.groups?.map((group: any) => ({
          ...group,
          conditionType: group?.conditionType?.value,
        })) ?? [],
      groupCondition: data?.groupCondition,
      actions: [...data?.actions],
    };
    const response: any =
      scheduleType === workflowTypes?.eventBase
        ? await postSalesWorkflowTrigger(modifiedData)
        : await postSaveDraftWorkflowTrigger(modifiedData);
    try {
      response;
      successSnackbar(response?.data?.message && successSnackbarMessage);
      reset();
      back();
    } catch (e) {
      errorSnackbar(response?.error?.data?.message);
    }
  };
  const { palette } = useTheme();
  return {
    salesMethod,
    handleFormSubmit,
    handleSubmit,
    palette,
    setValue,
    watch,
    control,
    isLoading,
    saveDraftLoading,
  };
};
