import { useForm } from 'react-hook-form';
import { awardFormDefaultValue, awardPointsSchema } from './AwardPoints.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';
import {
  useAddAwardPointsMutation,
  useGetAwardPointsQuery,
} from '@/services/airServices/settings/agent-performance-management/leader-board/award-points';
import { useEffect } from 'react';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useAwardPoints = () => {
  const { palette }: any = useTheme();
  const [addAwardPointsTrigger, addAwardPointsStatus] =
    useAddAwardPointsMutation();
  const { data, isLoading, isFetching } = useGetAwardPointsQuery({});

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
    } catch (error: any) {
      errorSnackbar();
    }
  };

  useEffect(() => {
    reset(() => awardFormDefaultValue(data?.data?.[0]));
  }, [data, reset]);

  return {
    awardPointsMethod,
    handleSubmit,
    awardCardBorderColors,
    isLoading,
    isFetching,
    addAwardPointsStatus,
  };
};
