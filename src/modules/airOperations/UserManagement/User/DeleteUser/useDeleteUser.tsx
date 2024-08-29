import { PAGINATION } from '@/config';
import { useDeleteProductUsersForOperationMutation } from '@/services/airOperations/user-management/user';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { UserPortalComponentPropsI } from '../User.interface';

export const useDeleteUser = (props: UserPortalComponentPropsI) => {
  const {
    totalRecords,
    setIsPortalOpen,
    setSelectedUserList,
    getOperationUsersList,
    page,
    setPage,
    selectedUserList,
  } = props;

  const [
    deleteProductUsersForOperationTrigger,
    deleteProductUsersForOperationStatus,
  ] = useDeleteProductUsersForOperationMutation();

  const deleteUser = async () => {
    const apiDataParameter = {
      queryParams: {
        ids: selectedUserList?.map((user: any) => user?._id)?.toString(),
      },
    };
    try {
      await deleteProductUsersForOperationTrigger(apiDataParameter)?.unwrap();
      successSnackbar?.('User deleted successfully!');
      closeUserDeleteModal?.();
      const newPage =
        totalRecords === selectedUserList?.length
          ? PAGINATION?.CURRENT_PAGE
          : page;
      setPage?.(newPage);
      await getOperationUsersList?.(newPage);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeUserDeleteModal = () => {
    setIsPortalOpen?.({});
    setSelectedUserList?.([]);
  };

  return {
    deleteUser,
    closeUserDeleteModal,
    deleteProductUsersForOperationStatus,
  };
};
