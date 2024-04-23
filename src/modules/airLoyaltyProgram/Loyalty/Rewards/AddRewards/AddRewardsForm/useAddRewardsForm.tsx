import { useForm } from 'react-hook-form';
import {
  addRewardsDefaultValues,
  REWARD_VALIDATION_SCHEMA,
} from './AddRewardsForm.data';
import { successSnackbar } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';

export const useAddRewardsForm: any = (props: any) => {
  const { setOpenDrawer, openDrawer } = props;

  const methods: any = useForm<any>({
    defaultValues: addRewardsDefaultValues,
    resolver: yupResolver(REWARD_VALIDATION_SCHEMA?.[openDrawer?.rewardType]),
  });

  const { reset, handleSubmit } = methods;

  const submitAddRewards = () => {
    successSnackbar('Successfull');
    closeAddRewardsForm();
  };

  const closeAddRewardsForm = () => {
    setOpenDrawer({});
    reset();
  };
  return {
    handleSubmit,
    methods,
    submitAddRewards,
    closeAddRewardsForm,
  };
};
