import { useForm } from 'react-hook-form';
import { awardFormDefaultValue, awardPointsSchema } from './AwardPoints.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';

export const useAwardPoints = () => {
  const { palette }: any = useTheme();
  const awardCardBorderColors = [
    palette?.info?.main,
    palette?.error?.darker,
    palette?.success?.main,
    palette?.warning?.main,
  ];
  const awardPointsMethod = useForm({
    defaultValues: awardFormDefaultValue,
    resolver: yupResolver(awardPointsSchema),
  });

  return {
    awardPointsMethod,
    awardCardBorderColors,
  };
};
