import { useForm } from 'react-hook-form';
import {
  addRewardsDefaultValues,
  addRewardsFormFieldsDynamic,
  REWARD_VALIDATION_SCHEMA,
} from './AddRewardsForm.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useAddLoyaltyRewardMutation,
  useLazyGetCustomersDropdownForRewardsQuery,
  useLazyGetTiersDropdownForRewardsQuery,
  useLazyGetVoucherDropdownForRewardsQuery,
} from '@/services/airLoyaltyProgram/loyalty/rewards';

export const useAddRewardsForm: any = (props: any) => {
  const { setOpenDrawer, openDrawer } = props;

  const [addLoyaltyRewardsTrigger, addLoyaltyRewardsStatus] =
    useAddLoyaltyRewardMutation?.();

  const methods: any = useForm<any>({
    defaultValues: addRewardsDefaultValues,
    resolver: yupResolver(REWARD_VALIDATION_SCHEMA?.[openDrawer?.rewardType]),
  });

  const { reset, handleSubmit } = methods;

  const submitAddRewards = async (data: any) => {
    const apiDataParameter = {
      body: data,
    };
    try {
      await addLoyaltyRewardsTrigger?.(apiDataParameter)?.unwrap();
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
  )?.filter((fields: any) => fields?.type?.includes(openDrawer?.rewardType));

  return {
    handleSubmit,
    methods,
    submitAddRewards,
    closeAddRewardsForm,
    addLoyaltyRewardsStatus,
    addRewardsFormFields,
  };
};
