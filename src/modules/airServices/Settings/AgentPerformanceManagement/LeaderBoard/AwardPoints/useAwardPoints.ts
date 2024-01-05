import { useForm } from 'react-hook-form';
import { awardFormDefaultValue, awardPointsSchema } from './AwardPoints.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';
import {
  useAddAwardPointsMutation,
  useGetAwardPointsQuery,
} from '@/services/airServices/settings/agent-performance-management/leader-board/award-points';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useAwardPoints = () => {
  const { palette }: any = useTheme();
  const [addAwardPoints] = useAddAwardPointsMutation();
  const { data: awardPoints = {} } = useGetAwardPointsQuery({});

  const awardCardBorderColors = [
    palette?.info?.main,
    palette?.error?.darker,
    palette?.success?.main,
    palette?.warning?.main,
  ];

  const awardPointsMethod: any = useForm({
    defaultValues: awardFormDefaultValue,
    resolver: yupResolver(awardPointsSchema),
  });

  const handleSubmit = async (values: any) => {
    try {
      await addAwardPoints(values)?.unwrap();
      enqueueSnackbar('Award points added successfully!', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const handleSetValues = () => {
    Object?.entries(awardPoints)?.map(
      ([key, value]) => awardPointsMethod?.setValue(key, value),
    );
  };

  return {
    awardPointsMethod,
    handleSubmit,
    awardCardBorderColors,
    handleSetValues,
    awardPoints,
  };
};
