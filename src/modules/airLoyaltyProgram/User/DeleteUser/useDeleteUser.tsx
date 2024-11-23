import { PAGINATION } from '@/config';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useGetUserLists } from '../UserHook/useGetUserLists';
import {
  emptySelectedUsersLists,
  setIsPortalClose,
  setPage,
} from '@/redux/slices/airLoyaltyProgram/users/slice';
import { useDeleteLoyaltyProgramUserManagementMultipleProductUsersMutation } from '@/services/airLoyaltyProgram/user';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import {
  loyaltyProgramUsersIsPortalOpenSelector,
  loyaltyProgramUsersSelectedUsersListsSelector,
  loyaltyProgramUsersTotalRecordsSelector,
} from '@/redux/slices/airLoyaltyProgram/users/selectors';

export const useDeleteUser = () => {
  const [
    deleteLoyaltyProgramUserManagementMultipleProductUsersTrigger,
    deleteLoyaltyProgramUserManagementMultipleProductUsersStatus,
  ] = useDeleteLoyaltyProgramUserManagementMultipleProductUsersMutation();

  const { getLoyaltyProgramUsersList, page } = useGetUserLists();

  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(loyaltyProgramUsersIsPortalOpenSelector);

  const selectedUsersLists = useAppSelector(
    loyaltyProgramUsersSelectedUsersListsSelector,
  );

  const totalRecords = useAppSelector(loyaltyProgramUsersTotalRecordsSelector);

  const refetchApi = async () => {
    const newPage =
      selectedUsersLists?.length === totalRecords
        ? PAGINATION?.CURRENT_PAGE
        : page;
    dispatch(setPage<any>(newPage));
    await getLoyaltyProgramUsersList?.();
  };

  const deleteUser = async () => {
    const apiDataParameter = {
      queryParams: {
        ids: selectedUsersLists?.map((user: any) => user?._id)?.toString(),
      },
    };
    try {
      await deleteLoyaltyProgramUserManagementMultipleProductUsersTrigger(
        apiDataParameter,
      )?.unwrap();
      successSnackbar?.('User deleted successfully!');
      closeUserDeleteModal?.();
      await refetchApi?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeUserDeleteModal = () => {
    dispatch(emptySelectedUsersLists());
    dispatch(setIsPortalClose());
  };

  const apiCallInProgress =
    deleteLoyaltyProgramUserManagementMultipleProductUsersStatus?.isLoading;

  return {
    deleteUser,
    closeUserDeleteModal,
    apiCallInProgress,
    isPortalOpen,
  };
};
