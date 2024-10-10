import { useForm } from 'react-hook-form';
import {
  addRewardsDefaultValues,
  rewardsValidationSchema,
} from './UpsertRewards.data';
import { yupResolver } from '@hookform/resolvers/yup';

export const useUpsertRewards = () => {
  const methods = useForm({
    resolver: yupResolver(rewardsValidationSchema),
    defaultValues: addRewardsDefaultValues,
  });
  const { handleSubmit, watch } = methods;
  const onSubmit = () => {};
  return {
    watch,
    methods,
    onSubmit,
    handleSubmit,
  };
};
