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
  DATA_TYPES,
  LOYALTY_REWARDS_STATUS,
  LOYALTY_REWARDS_TYPE,
  ROLES,
} from '@/constants/strings';
import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';

export const useAddRewardsForm: any = (props: any) => {
  const { setOpenDrawer, openDrawer, airSalesAccount } = props;
  const { user }: any = useAuth();
  const [addDigitalLoyaltyRewardTrigger, addDigitalLoyaltyRewardStatus] =
    useAddDigitalLoyaltyRewardMutation?.();

  const [addPhysicalLoyaltyRewardTrigger, addPhysicalLoyaltyRewardStatus] =
    useAddPhysicalLoyaltyRewardMutation?.();

  const methods: any = useForm<any>({
    defaultValues: addRewardsDefaultValues,
    resolver: yupResolver(REWARD_VALIDATION_SCHEMA?.[openDrawer?.rewardType]),
  });

  const { reset, handleSubmit, control, clearErrors, setValue } = methods;
  const externalParamsVisible = {
    products: airSalesAccount?.(),
    organization: user?.organization?._id,
    role: ROLES?.ORG_EMPLOYEE,
  };
  const watchForDeactivate = useWatch({
    control,
    name: 'untilDeactivate',
    defaultValue: false,
  });

  useEffect(() => {
    clearErrors?.('activeTo');
    if (watchForDeactivate) setValue?.('activeTo', null);
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
    digitalRewardFormData?.append(
      'activeFrom',
      formData?.activeFrom?.toISOString(),
    );
    !formData?.untilDeactivate &&
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
      successSnackbar('Reward added Successfully');
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
    physicalRewardFormData?.append(
      'activeFrom',
      formData?.activeFrom?.toISOString(),
    );
    !formData?.untilDeactivate &&
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
    formData?.fileUrl !== DATA_TYPES?.NULL &&
      physicalRewardFormData?.append('fileUrl', formData?.fileUrl);

    const apiDataParameter = {
      body: physicalRewardFormData,
    };

    try {
      await addPhysicalLoyaltyRewardTrigger?.(apiDataParameter)?.unwrap();
      successSnackbar('Reward added Successfully');
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
    externalParamsVisible,
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
