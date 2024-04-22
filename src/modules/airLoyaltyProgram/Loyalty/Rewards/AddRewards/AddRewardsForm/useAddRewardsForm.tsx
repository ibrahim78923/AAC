import { useForm } from 'react-hook-form';
import {
  addRewardsDefaultValues,
  REWARD_VALIDATION_SCHEMA,
} from './AddRewardsForm.data';
import { successSnackbar } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';

export const useAddRewardsForm = (props: any) => {
  const { setOpenDrawer, actionType } = props;

  const methods: any = useForm<any>({
    defaultValues: addRewardsDefaultValues,
    resolver: yupResolver(REWARD_VALIDATION_SCHEMA?.[actionType]),
  });

  const { reset, handleSubmit } = methods;

  const submitAddRewards = () => {
    successSnackbar('Successfull');
    closeAddRewardsForm();
  };

  const closeAddRewardsForm = () => {
    setOpenDrawer(false);
    reset();
  };
  return {
    handleSubmit,
    methods,
    submitAddRewards,
    closeAddRewardsForm,
  };
};
