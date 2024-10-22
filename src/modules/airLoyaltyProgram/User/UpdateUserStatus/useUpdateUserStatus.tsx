import { PRODUCT_USER_STATUS } from '@/constants/strings';
import { errorSnackbar } from '@/lib/snackbar';
import { useUpdateLoyaltyProgramUserManagementSingleProductUserMutation } from '@/services/airLoyaltyProgram/user';

export const useUpdateUserStatus = (props: any) => {
  const { currentId } = props;
  const [
    changeLoyaltyProgramUserStatusTrigger,
    changeLoyaltyProgramUserStatusStatus,
  ] = useUpdateLoyaltyProgramUserManagementSingleProductUserMutation?.();

  const changeOperationUserStatus = async (e: any) => {
    const body = {
      status: e?.target?.checked
        ? PRODUCT_USER_STATUS?.ACTIVE
        : PRODUCT_USER_STATUS?.INACTIVE,
    };

    const apiDataParameter = {
      pathParams: {
        id: currentId,
      },
      body,
    };

    try {
      await changeLoyaltyProgramUserStatusTrigger(apiDataParameter)?.unwrap();
    } catch (error: any) {
      errorSnackbar?.(error?.data?.message);
    }
  };
  const apiCallInProgress = changeLoyaltyProgramUserStatusStatus?.isLoading;

  return {
    changeOperationUserStatus,
    apiCallInProgress,
  };
};
