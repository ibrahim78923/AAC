import { PRODUCT_USER_STATUS } from '@/constants/strings';
import {
  resetIsSwitchDisabled,
  setIsSwitchDisabled,
} from '@/redux/slices/airOperations/users/slice';
import { useAppDispatch } from '@/redux/store';
import { useUpdateOperationsUserManagementSingleProductUserMutation } from '@/services/airOperations/user-management/user';
import { errorSnackbar } from '@/utils/api';

export const useUpdateUserStatus = (props: any) => {
  const { currentId } = props;
  const dispatch = useAppDispatch();
  const [changeSingleUserStatusTrigger] =
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
      dispatch(
        setIsSwitchDisabled<any>({
          _id: currentId,
          disabled: true,
        }),
      );
      await changeSingleUserStatusTrigger(apiDataParameter)?.unwrap();
    } catch (error: any) {
      errorSnackbar?.(error?.data?.message);
    }
    dispatch(resetIsSwitchDisabled());
  };

  return {
    changeOperationUserStatus,
  };
};
