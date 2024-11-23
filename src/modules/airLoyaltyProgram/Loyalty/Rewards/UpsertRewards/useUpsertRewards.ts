import { useForm } from 'react-hook-form';
import {
  addRewardsDefaultValues,
  rewardsValidationSchema,
} from './UpsertRewards.data';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useAddLoyaltyProgramRewardsMutation,
  useGetLoyaltyProgramRewardsByIdQuery,
  useLazyGetLoyaltyProgramLoyaltyTiersListDropdownQuery,
  useUpdateLoyaltyProgramRewardsMutation,
} from '@/services/airLoyaltyProgram/loyalty/rewards';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { isoDateString } from '@/lib/date-time';

export const useUpsertRewards = (props: any) => {
  const { setIsRewardDrawerOpen, isRewardDrawerOpen } = props;

  const id = isRewardDrawerOpen?.data;

  const { data, isLoading, isFetching, isError } =
    useGetLoyaltyProgramRewardsByIdQuery(id, {
      refetchOnMountOrArgChange: true,
      skip: !!!isRewardDrawerOpen?.data,
    });

  const methods = useForm({
    resolver: yupResolver(rewardsValidationSchema),
    defaultValues: addRewardsDefaultValues(data),
  });
  const { handleSubmit, watch, reset } = methods;

  const [rewardsTrigger, rewardsStatus] = useAddLoyaltyProgramRewardsMutation();
  const onSubmit = async (formData: any) => {
    const rewardFormData = new FormData();
    rewardFormData?.append('title', formData?.title);
    rewardFormData?.append('requiredPoints', formData?.requiredPoints);
    !!formData?.fileUrl && rewardFormData?.append('fileUrl', formData?.fileUrl);
    rewardFormData?.append('appliedTo', formData?.appliedTo?._id);
    rewardFormData?.append('costPrice', formData?.costPrice);
    rewardFormData?.append('quantity', formData?.quantity);
    rewardFormData?.append('activeFrom', isoDateString(formData?.activeFrom));
    rewardFormData?.append('activeTo', isoDateString(formData?.activeTo));
    rewardFormData?.append('redeemedLimitType', formData?.limitRewards);
    rewardFormData?.append('redemptionLimitPerConsumer', formData?.limit);
    if (!!id) {
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
    rewardFormData?.append('id', id);
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
  const getTiersDropdown =
    useLazyGetLoyaltyProgramLoyaltyTiersListDropdownQuery();

  return {
    watch,
    methods,
    onSubmit,
    handleSubmit,
    rewardsStatus,
    updateRewardStatus,
    getTiersDropdown,
    isLoading,
    isFetching,
    isError,
  };
};
