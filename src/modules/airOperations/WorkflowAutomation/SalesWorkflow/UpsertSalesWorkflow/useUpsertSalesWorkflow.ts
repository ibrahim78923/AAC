import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { salesSchema, salesValues } from './UpsertSalesWorkflow.data';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { usePostSalesWorkflowMutation } from '@/services/airOperations/workflow-automation/sales-workflow';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import dayjs from 'dayjs';

export const useUpsertSalesWorkflow = () => {
  const { back } = useRouter();
  const salesMethod = useForm({
    defaultValues: salesValues,
    resolver: yupResolver(salesSchema),
  });
  const { reset, watch, register, handleSubmit, setValue, control } =
    salesMethod;
  const [postSalesWorkflowTrigger, { isLoading }] =
    usePostSalesWorkflowMutation();
  const handleFormSubmit = async (data: any) => {
    const time = dayjs(data?.time)?.format('h:mm A');
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
          day: Number(dayjs(data?.scheduleDate)?.format('d')),
          time: time,
        },
        annually: {
          month: dayjs(data?.scheduleMonth)
            ?.format('MMMM')
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
    try {
      const response: any = await postSalesWorkflowTrigger(modifiedData);
      successSnackbar(
        response?.data?.message && 'Workflow Enabled Successfully',
      );
      reset();
      back();
    } catch (error: any) {
      errorSnackbar(error?.data?.error);
    }
  };
  const { palette } = useTheme();
  const moduleType = watch('module');
  return {
    salesMethod,
    handleFormSubmit,
    register,
    handleSubmit,
    palette,
    moduleType,
    setValue,
    watch,
    control,
    isLoading,
  };
};
