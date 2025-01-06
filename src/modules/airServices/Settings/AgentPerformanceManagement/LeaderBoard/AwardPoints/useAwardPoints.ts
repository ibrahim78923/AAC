import { awardFormDefaultValue, awardPointsSchema } from './AwardPoints.data';
import { useTheme } from '@mui/material';
import {
  useAddAirServicesSettingsLeaderBoardAwardPointsMutation,
  useGetAirServicesSettingsLeaderBoardAwardPointsQuery,
} from '@/services/airServices/settings/agent-performance-management/leader-board/award-points';
import { useEffect } from 'react';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useRouter } from 'next/router';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { ARRAY_INDEX } from '@/constants/strings';
import { useFormLib } from '@/hooks/useFormLib';

export const useAwardPoints = () => {
  const router = useRouter();
  const { palette }: any = useTheme();

  const [addAwardPointsTrigger, addAwardPointsStatus] =
    useAddAirServicesSettingsLeaderBoardAwardPointsMutation();

  const { data, isLoading, isFetching } =
    useGetAirServicesSettingsLeaderBoardAwardPointsQuery({});

  const awardCardBorderColors = [
    palette?.info?.main,
    palette?.error?.darker,
    palette?.success?.main,
    palette?.warning?.main,
  ];

  const formLibProps = {
    validationSchema: awardPointsSchema,
    defaultValues: awardFormDefaultValue?.(),
  };

  const { handleSubmit, reset, methods } = useFormLib(formLibProps);

  const submitAwardForm = async (values: any) => {
    try {
      await addAwardPointsTrigger(values)?.unwrap();
      successSnackbar('Award points added successfully!');
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };

  useEffect(() => {
    reset(() => awardFormDefaultValue(data?.data?.[ARRAY_INDEX?.ZERO]));
  }, [data, reset]);

  return {
    methods,
    handleSubmit,
    awardCardBorderColors,
    isLoading,
    isFetching,
    addAwardPointsStatus,
    router,
    submitAwardForm,
  };
};
