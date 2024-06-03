import { ARRAY_INDEX } from '@/constants/strings';
import { useDeleteRoleForLoyaltyMutation } from '@/services/airLoyaltyProgram/roles-and-right';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useDeleteRoles = (props: any) => {
  const {
    setIsPortalOpen,
    selectedRolesList,
    setSelectedRolesList,
    setPage,
    totalRecords,
    page,
    getRolesListData,
  } = props;
  const [deleteRoleForLoyaltyTrigger, deleteRoleForLoyaltyStatus] =
    useDeleteRoleForLoyaltyMutation();

  const deleteRoles = async () => {
    const deleteParams = new URLSearchParams();

    selectedRolesList?.forEach(
      (RolesId: any) => deleteParams?.append('ids', RolesId),
    );

    const deleteRolesParameter = {
      pathParams: { roleId: selectedRolesList?.[ARRAY_INDEX?.ZERO]?._id },
    };

    try {
      await deleteRoleForLoyaltyTrigger(deleteRolesParameter)?.unwrap();
      successSnackbar('Record deleted successfully');
      closeDeleteModal?.();
      setIsPortalOpen?.(false);
      const newPage = selectedRolesList?.length === totalRecords ? 1 : page;
      setPage?.(newPage);
      await getRolesListData?.(newPage);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeDeleteModal = () => {
    setSelectedRolesList?.([]);
    setIsPortalOpen?.(false);
  };

  return {
    deleteRoles,
    deleteRoleForLoyaltyStatus,
    closeDeleteModal,
  };
};
