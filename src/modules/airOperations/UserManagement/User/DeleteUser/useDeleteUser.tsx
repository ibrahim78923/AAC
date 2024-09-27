import { PAGINATION } from '@/config';
import { useDeleteOperationsUserManagementMultipleProductUsersMutation } from '@/services/airOperations/user-management/user';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useGetUserLists } from '../../UserManagementHooks/useGetUserLists';
import {
  emptySelectedUsersLists,
  setIsPortalClose,
  setPage,
} from '@/redux/slices/airOperations/users/slice';

export const useDeleteUser = () => {
  const [
    deleteProductUsersForOperationTrigger,
    deleteProductUsersForOperationStatus,
  ] = useDeleteOperationsUserManagementMultipleProductUsersMutation();

  const { getOperationUsersList, page } = useGetUserLists();

  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(
    (state) => state?.operationsUsersLists?.isPortalOpen,
  );

  const selectedUsersLists = useAppSelector(
    (state) => state?.operationsUsersLists?.selectedUsersLists,
  );

  const totalRecords = useAppSelector(
    (state) => state?.operationsUsersLists?.totalRecords,
  );

  const refetchApi = async () => {
    const newPage =
      selectedUsersLists?.length === totalRecords
        ? PAGINATION?.CURRENT_PAGE
        : page;
    dispatch(setPage<any>(newPage));
    await getOperationUsersList?.();
  };

  const deleteUser = async () => {
    const apiDataParameter = {
      queryParams: {
        ids: selectedUsersLists?.map((user: any) => user?._id)?.toString(),
      },
    };
    try {
      await deleteProductUsersForOperationTrigger(apiDataParameter)?.unwrap();
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

  return {
    deleteUser,
    closeUserDeleteModal,
    deleteProductUsersForOperationStatus,
    isPortalOpen,
  };
};
