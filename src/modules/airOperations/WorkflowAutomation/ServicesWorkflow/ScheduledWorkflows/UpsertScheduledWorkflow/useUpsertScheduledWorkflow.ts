import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  scheduledWorkflowSchema,
  scheduledWorkflowValues,
} from './UpsertScheduledWorkflow.data';
import { useTheme } from '@mui/material';
import { usePostServicesWorkflowMutation } from '@/services/airOperations/workflow-automation/services-workflow';
import { useRouter } from 'next/router';
import { AIR_OPERATIONS, DATE_TIME_FORMAT, TIME_FORMAT } from '@/constants';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import dayjs from 'dayjs';

export const useUpsertScheduledWorkflow = () => {
  const router = useRouter();
  const movePage = () => {
    router.push({
      pathname: AIR_OPERATIONS?.SERVICES_WORKFLOW,
    });
  };
  const scheduledWorkflowMethod = useForm({
    defaultValues: scheduledWorkflowValues,
    resolver: yupResolver(scheduledWorkflowSchema),
  });
  const { reset, watch, register, handleSubmit, setValue, control } =
    scheduledWorkflowMethod;
  const [postWorkflowTrigger] = usePostServicesWorkflowMutation();
  const handleFormSubmit = async (data: any) => {
    const timeRange = dayjs(data?.time)?.format(TIME_FORMAT?.API);
    const {
      options,
      schedule,
      scheduleDay,
      scheduleMonth,
      time,
      scheduleDate,
      custom,
      ...rest
    } = data;
    const body = {
      ...rest,
      schedule: {
        type: data?.schedule?.toUpperCase(),
        daily: {
          time: timeRange,
        },
        weekly: {
          days: [data?.scheduleDay?.toUpperCase()],
          time: timeRange,
        },
        monthly: {
          day: Number(dayjs(data?.scheduleDate)?.format(DATE_TIME_FORMAT?.D)),
          time: timeRange,
        },
        annually: {
          month: dayjs(data?.scheduleMonth)
            ?.format(DATE_TIME_FORMAT?.DDMMYYYY)
            ?.toLowerCase(),
          time: timeRange,
        },
        custom: {
          startDate: data?.custom?.startDate,
          endDate: data?.custom?.endDate,
          time: timeRange,
        },
      },
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
      return {
        options,
        schedule,
        scheduleDay,
        scheduleMonth,
        time,
        scheduleDate,
        custom,
      };
    } catch (error) {
      errorSnackbar();
    }
  };
  const { palette } = useTheme();
  const moduleType = watch('module');
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
