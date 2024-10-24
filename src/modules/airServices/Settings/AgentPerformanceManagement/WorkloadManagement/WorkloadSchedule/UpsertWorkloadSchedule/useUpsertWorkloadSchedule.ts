import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import {
  useGetAirServicesSettingsWorkloadScheduleByIdQuery,
  usePatchAirServicesSettingsWorkloadScheduleMutation,
  usePostAirServicesSettingsWorkloadScheduleMutation,
} from '@/services/airServices/settings/agent-performance-management/workload-management/workload-schedule';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useEffect } from 'react';
import {
  upsertWorkloadScheduleDefaultValues,
  upsertWorkloadScheduleFormFieldsDynamic,
  upsertWorkloadScheduleValidationSchema,
} from './UpsertWorkloadSchedule.data';
import { AIR_SERVICES } from '@/constants/routes';
import { ARRAY_INDEX } from '@/constants/strings';
import { IErrorResponse } from '@/types/shared/ErrorResponse';

export const useUpsertWorkloadSchedule = () => {
  const router = useRouter();
  const { workloadScheduleId } = router?.query;

  const [postWorkloadScheduleTrigger, postWorkloadScheduleStatus] =
    usePostAirServicesSettingsWorkloadScheduleMutation();
  const [patchWorkloadScheduleTrigger, patchWorkloadScheduleStatus] =
    usePatchAirServicesSettingsWorkloadScheduleMutation();

  const getSingleWorkloadScheduleParameter = {
    queryParams: {
      id: workloadScheduleId,
    },
  };

  const { data, isLoading, isFetching, isError } =
    useGetAirServicesSettingsWorkloadScheduleByIdQuery(
      getSingleWorkloadScheduleParameter,
      {
        refetchOnMountOrArgChange: true,
        skip: !!!workloadScheduleId,
      },
    );

  const method = useForm<any>({
    defaultValues: upsertWorkloadScheduleDefaultValues?.(),
    resolver: yupResolver(upsertWorkloadScheduleValidationSchema),
  });

  const { reset, handleSubmit, getValues } = method;

  useEffect(() => {
    reset(() =>
      upsertWorkloadScheduleDefaultValues(data?.data?.[ARRAY_INDEX?.ZERO]),
    );
  }, [data, reset]);

  const submitWorkloadSchedule = async (data: any) => {
    const body = {
      ...data,
      agentsId: data?.agentsId?.map((agent: any) => agent?._id),
      businessHoursId: data?.businessHoursId?._id,
    };
    const postWorkloadScheduleParameter = {
      body,
    };

    if (!!workloadScheduleId) {
      submitUpdateWorkloadSchedule(body);
      return;
    }

    try {
      await postWorkloadScheduleTrigger(
        postWorkloadScheduleParameter,
      )?.unwrap();
      successSnackbar('Workload Schedule Added Successfully');
      moveBack?.();
      reset();
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };
  const submitUpdateWorkloadSchedule = async (data: any) => {
    const patchWorkloadScheduleParameter = {
      body: {
        ...data,
        id: workloadScheduleId,
      },
    };

    try {
      await patchWorkloadScheduleTrigger(
        patchWorkloadScheduleParameter,
      )?.unwrap();
      successSnackbar('Workload Schedule Updated Successfully');
      moveBack?.();
      reset();
    } catch (error) {
      errorSnackbar();
    }
  };

  const moveBack = () => {
    router?.push(AIR_SERVICES?.WORKLOAD_MANAGEMENT_SETTINGS);
  };

  const upsertWorkloadScheduleFormFields =
    upsertWorkloadScheduleFormFieldsDynamic(getValues, router);

  return {
    handleSubmit,
    method,
    submitWorkloadSchedule,
    router,
    workloadScheduleId,
    upsertWorkloadScheduleFormFields,
    isLoading,
    isFetching,
    isError,
    patchWorkloadScheduleStatus,
    postWorkloadScheduleStatus,
    moveBack,
  };
};
