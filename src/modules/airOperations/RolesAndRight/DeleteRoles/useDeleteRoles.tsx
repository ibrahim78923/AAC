import { ARRAY_INDEX } from '@/constants/strings';
import { useDeleteRoleForOperationsMutation } from '@/services/airOperations/roles-and-right';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import {
  IDeleteRolesParameter,
  IUseDeleteRolesProps,
} from './DeleteRoles.interface';
import { IErrorResponse } from '@/types/shared/ErrorResponse';

export const useDeleteRoles = (props: IUseDeleteRolesProps) => {
  const {
    setIsPortalOpen,
    selectedRolesList,
    setSelectedRolesList,
    setPage,
    totalRecords,
    page,
    getRolesListData,
  } = props;
  const [deleteRoleForOperationsTrigger, deleteRoleForOperationsStatus] =
    useDeleteRoleForOperationsMutation();

  const deleteRoles = async () => {
    const deleteParams = new URLSearchParams();

    selectedRolesList?.forEach(
      (rolesId: string) => deleteParams?.append('ids', rolesId),
    );

    const deleteRolesParameter: IDeleteRolesParameter = {
      pathParams: { roleId: selectedRolesList?.[ARRAY_INDEX?.ZERO]?._id },
    };

    try {
      await deleteRoleForOperationsTrigger(deleteRolesParameter)?.unwrap();
      successSnackbar('Record deleted successfully');
      closeDeleteModal?.();
      const newPage = selectedRolesList?.length === totalRecords ? 1 : page;
      setPage?.(newPage);
      await getRolesListData?.(newPage);
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };

  const closeDeleteModal = () => {
    setSelectedRolesList?.([]);
    setIsPortalOpen?.(false);
  };

  return {
    deleteRoles,
    deleteRoleForOperationsStatus,
    closeDeleteModal,
  };
};
