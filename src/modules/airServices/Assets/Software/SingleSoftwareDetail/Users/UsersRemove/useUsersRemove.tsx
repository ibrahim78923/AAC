import { PAGINATION } from '@/config';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useRemoveContractMutation } from '@/services/airServices/assets/software/single-software-detail/users';

export const useUsersRemove = (props: any) => {
  const {
    setUsersData,
    setIsPortalOpen,
    usersData,
    page,
    setPage,
    totalRecords,
    handleGetUser,
  } = props;

  const [userRemoveTrigger, { isLoading }] = useRemoveContractMutation();

  const closeModal = () => {
    setIsPortalOpen?.({});
    setUsersData([]);
  };

  const refetchApi = async () => {
    const newPage =
      usersData?.length === totalRecords ? PAGINATION?.CURRENT_PAGE : page;
    setPage?.(newPage);
    await handleGetUser?.(newPage);
  };

  const handleUserRemove = async () => {
    const deleteParams = new URLSearchParams();
    usersData?.forEach((user: any) => deleteParams?.append('ids', user?._id));

    try {
      await userRemoveTrigger({
        params: deleteParams,
      });
      successSnackbar('Users Removed Successfully');
      closeModal?.();
      await refetchApi();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    handleUserRemove,
    closeModal,
    isLoading,
  };
};
