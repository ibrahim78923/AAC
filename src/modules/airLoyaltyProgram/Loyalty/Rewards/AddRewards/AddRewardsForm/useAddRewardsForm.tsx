import { useForm, useWatch } from 'react-hook-form';
import {
  addRewardsDefaultValues,
  addRewardsFormFieldsDynamic,
  REWARD_VALIDATION_SCHEMA,
} from './AddRewardsForm.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useAddDigitalLoyaltyRewardMutation,
  useAddPhysicalLoyaltyRewardMutation,
  useLazyGetCustomersDropdownForRewardsQuery,
  useLazyGetTiersDropdownForRewardsQuery,
  useLazyGetVoucherDropdownForRewardsQuery,
} from '@/services/airLoyaltyProgram/loyalty/rewards';
import {
  LOYALTY_REWARDS_STATUS,
  LOYALTY_REWARDS_TYPE,
} from '@/constants/strings';
import { useEffect } from 'react';

export const useAddRewardsForm: any = (props: any) => {
  const { setOpenDrawer, openDrawer } = props;

  const [addDigitalLoyaltyRewardTrigger, addDigitalLoyaltyRewardStatus] =
    useAddDigitalLoyaltyRewardMutation?.();

  const [addPhysicalLoyaltyRewardTrigger, addPhysicalLoyaltyRewardStatus] =
    useAddPhysicalLoyaltyRewardMutation?.();

  const methods: any = useForm<any>({
    defaultValues: addRewardsDefaultValues,
    resolver: yupResolver(REWARD_VALIDATION_SCHEMA?.[openDrawer?.rewardType]),
  });

  const { reset, handleSubmit, control, clearErrors } = methods;

  const watchForDeactivate = useWatch({
    control,
    name: 'untilDeactivate',
    defaultValue: false,
  });

  useEffect(() => {
    clearErrors?.('activeTo');
  }, [watchForDeactivate]);
  const submitAddRewards = async (formData: any) => {
    if (openDrawer?.rewardType === LOYALTY_REWARDS_TYPE?.PHYSICAL_REWARD) {
      await submitAddPhysicalRewards?.(formData);
      return;
    }
    await submitAddDigitalRewards?.(formData);
  };

  const submitAddDigitalRewards = async (formData: any) => {
    const digitalRewardFormData = new FormData();
    digitalRewardFormData?.append('title', formData?.title);
    digitalRewardFormData?.append('requiredPoints', formData?.requiredPoints);
    digitalRewardFormData?.append('voucherId', formData?.chooseVoucher?._id);
    formData?.activeFrom !== null &&
      digitalRewardFormData?.append(
        'activeFrom',
        formData?.activeFrom?.toISOString(),
      );
    formData?.activeTo !== null &&
      digitalRewardFormData?.append(
        'activeTo',
        formData?.activeTo?.toISOString(),
      );
    digitalRewardFormData?.append('untilDeactivate', formData?.untilDeactivate);
    digitalRewardFormData?.append('tiersId', formData?.chooseCategory._id);
    digitalRewardFormData?.append('status', LOYALTY_REWARDS_STATUS?.ACTIVE);
    const apiDataParameter = {
      body: digitalRewardFormData,
    };
    try {
      await addDigitalLoyaltyRewardTrigger?.(apiDataParameter)?.unwrap();
      successSnackbar('Successful');
      closeAddRewardsForm();
    } catch (error: any) {
      errorSnackbar?.(error?.data?.message);
    }
  };

  const submitAddPhysicalRewards = async (formData: any) => {
    const physicalRewardFormData = new FormData();
    physicalRewardFormData?.append('title', formData?.title);
    physicalRewardFormData?.append('requiredPoints', formData?.requiredPoints);
    physicalRewardFormData?.append('cost', formData?.costPrice);
    formData?.activeFrom !== null &&
      physicalRewardFormData?.append(
        'activeFrom',
        formData?.activeFrom?.toISOString(),
      );
    formData?.activeTo !== null && !formData?.untilDeactivate;
    physicalRewardFormData?.append(
      'activeTo',
      formData?.activeTo?.toISOString(),
    );

    physicalRewardFormData?.append(
      'untilDeactivate',
      formData?.untilDeactivate,
    );
    physicalRewardFormData?.append(
      'visibleTo',
      formData?.visibleTo?.map((user: any) => user?._id),
    );
    physicalRewardFormData?.append('status', LOYALTY_REWARDS_STATUS?.ACTIVE);
    const apiDataParameter = {
      body: physicalRewardFormData,
    };
    try {
      await addPhysicalLoyaltyRewardTrigger?.(apiDataParameter)?.unwrap();
      successSnackbar('Successful');
      closeAddRewardsForm();
    } catch (error: any) {
      errorSnackbar?.(error?.data?.message);
    }
  };

  const closeAddRewardsForm = () => {
    setOpenDrawer({});
    reset();
  };

  const customersApiQuery = useLazyGetCustomersDropdownForRewardsQuery?.();
  const vouchersApiQuery = useLazyGetVoucherDropdownForRewardsQuery?.();
  const tiersApiQuery = useLazyGetTiersDropdownForRewardsQuery?.();

  const addRewardsFormFields = addRewardsFormFieldsDynamic?.(
    customersApiQuery,
    vouchersApiQuery,
    tiersApiQuery,
    watchForDeactivate,
  )?.filter((fields: any) => fields?.type?.includes(openDrawer?.rewardType));

  return {
    handleSubmit,
    methods,
    submitAddRewards,
    closeAddRewardsForm,
    addDigitalLoyaltyRewardStatus,
    addPhysicalLoyaltyRewardStatus,
    addRewardsFormFields,
  };
};
