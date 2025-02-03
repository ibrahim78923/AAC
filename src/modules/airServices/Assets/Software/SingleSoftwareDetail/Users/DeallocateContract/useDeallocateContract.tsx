import { ARRAY_INDEX } from '@/constants/strings';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useDeallocateContractMutation } from '@/services/airServices/assets/software/single-software-detail/users';

export const useDeallocateContract = (props: any) => {
  const { setUsersData, setIsPortalOpen, usersData } = props;
  const [userDeallocateTrigger, { isLoading }] =
    useDeallocateContractMutation();

  const closeModal = () => {
    setIsPortalOpen?.({});
    setUsersData([]);
  };

  const handleUserDeallocation = async () => {
    if (!!!usersData?.[ARRAY_INDEX?.ZERO]?.contractId) {
      errorSnackbar('User has no contract to deallocate');
      return;
    }

    const deallocateParams = {
      contractId: usersData?.[ARRAY_INDEX?.ZERO]?.contractId,
      id: usersData?.[ARRAY_INDEX?.ZERO]?._id,
    };

    try {
      await userDeallocateTrigger(deallocateParams)?.unwrap();
      successSnackbar('Contract deallocate successfully');
      closeModal?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    handleUserDeallocation,
    closeModal,
    isLoading,
  };
};
