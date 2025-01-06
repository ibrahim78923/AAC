import {
  addRewardsDefaultValues,
  rewardsValidationSchema,
} from './UpsertRewards.data';
import {
  useAddLoyaltyProgramRewardsMutation,
  useGetLoyaltyProgramRewardsByIdQuery,
  useUpdateLoyaltyProgramRewardsMutation,
} from '@/services/airLoyaltyProgram/loyalty/rewards';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { isoDateString } from '@/lib/date-time';
import { useEffect } from 'react';
import { useFormLib } from '@/hooks/useFormLib';

export const useUpsertRewards = (props: any) => {
  const { setIsRewardDrawerOpen, isRewardDrawerOpen } = props;

  const rewardId = isRewardDrawerOpen?.data;

  const { data, isLoading, isFetching, isError } =
    useGetLoyaltyProgramRewardsByIdQuery(
      { id: rewardId },
      {
        refetchOnMountOrArgChange: true,
        skip: !!!rewardId,
      },
    );

  const useFormValues = {
    validationSchema: rewardsValidationSchema,
    defaultValues: addRewardsDefaultValues(data),
  };
  const { handleSubmit, watch, reset, methods } = useFormLib(useFormValues);

  useEffect(() => {
    reset(addRewardsDefaultValues(data));
  }, [reset, data]);

  const [rewardsTrigger, rewardsStatus] = useAddLoyaltyProgramRewardsMutation();
  const onSubmit = async (formData: any) => {
    const rewardFormData = new FormData();
    rewardFormData?.append('title', formData?.title);
    rewardFormData?.append('requiredPoints', formData?.requiredPoints);
    !!formData?.fileUrl && rewardFormData?.append('fileUrl', formData?.fileUrl);
    rewardFormData?.append('appliedTo', formData?.appliedTo?._id);
    rewardFormData?.append('costPrice', formData?.costPrice);
    rewardFormData?.append('quantity', formData?.quantity);
    rewardFormData?.append('activeTo', isoDateString(formData?.activeTo));
    rewardFormData?.append('activeFrom', isoDateString(formData?.activeFrom));
    rewardFormData?.append('redeemedLimitType', formData?.limitRewards);
    rewardFormData?.append('redemptionLimitPerConsumer', formData?.limit);
    if (!!rewardId) {
      updateSubmit(rewardFormData);
      return;
    }
    const apiDataParameter: any = {
      body: rewardFormData,
    };
    try {
      await rewardsTrigger?.(apiDataParameter)?.unwrap();
      setIsRewardDrawerOpen?.({ isOpen: false, data: '' });
      successSnackbar('Reward added successfully');
      reset();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const [updateRewardTrigger, updateRewardStatus] =
    useUpdateLoyaltyProgramRewardsMutation();
  const updateSubmit = async (formData: any) => {
    const rewardFormData = formData;
    rewardFormData?.append('id', rewardId);
    const apiDataParameter = {
      body: rewardFormData,
    };
    try {
      await updateRewardTrigger?.(apiDataParameter)?.unwrap();
      setIsRewardDrawerOpen?.({ isOpen: false, data: '' });
      successSnackbar('Reward updated successfully');
      reset();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    watch,
    methods,
    onSubmit,
    handleSubmit,
    rewardsStatus,
    updateRewardStatus,
    isLoading,
    isFetching,
    isError,
    rewardId,
  };
};
