import { useForm } from 'react-hook-form';
import { awardFormDefaultValue, awardPointsSchema } from './AwardPoints.data';
import { yupResolver } from '@hookform/resolvers/yup';
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

  const awardPointsMethod: any = useForm<any>({
    defaultValues: awardFormDefaultValue?.(),
    resolver: yupResolver(awardPointsSchema),
  });

  const { reset } = awardPointsMethod;

  const handleSubmit = async (values: any) => {
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
    awardPointsMethod,
    handleSubmit,
    awardCardBorderColors,
    isLoading,
    isFetching,
    addAwardPointsStatus,
    router,
  };
};
