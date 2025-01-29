import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useDeleteRoleMutation } from '@/services/airServices/settings/user-management/roles';

export const useDeleteRole = (props: any) => {
  const {
    rolesListData,
    setOpenDeleteModal,
    setPage,
    totalRecords,
    page,
    openDeleteModal,
  } = props;

  const [deleteRolesTrigger, deleteRolesStatus] = useDeleteRoleMutation();

  const closeModal = () => {
    setOpenDeleteModal({ isOpen: false, roleId: null });
  };

  const handleSubmitDelete = async () => {
    try {
      await deleteRolesTrigger(openDeleteModal?.roleId)?.unwrap();
      successSnackbar('Role Deleted Successfully!');
      closeModal?.();
      const newPage = totalRecords === 1 ? 1 : page;
      setPage?.(newPage);
      await rolesListData?.(newPage);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const apiCallInProgress = deleteRolesStatus?.isLoading;

  return {
    closeModal,
    apiCallInProgress,
    handleSubmitDelete,
  };
};
