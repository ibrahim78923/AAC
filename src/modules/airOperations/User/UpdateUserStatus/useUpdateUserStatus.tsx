import { PRODUCT_USER_STATUS } from '@/constants/strings';
import { errorSnackbar } from '@/lib/snackbar';
import { useUpdateOperationsUserManagementSingleProductUserMutation } from '@/services/airOperations/user-management/user';

export const useUpdateUserStatus = (props: any) => {
  const { currentId } = props;
  const [changeSingleUserStatusTrigger, changeSingleUserStatusStatus] =
    useUpdateOperationsUserManagementSingleProductUserMutation?.();

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
      await changeSingleUserStatusTrigger(apiDataParameter)?.unwrap();
    } catch (error: any) {
      errorSnackbar?.(error?.data?.message);
    }
  };

  return {
    changeOperationUserStatus,
    changeSingleUserStatusStatus,
  };
};
