import { ARRAY_INDEX } from '@/constants/strings';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useDeleteLoyaltyProgramRoleAndRightsSinglePermissionRoleMutation } from '@/services/airLoyaltyProgram/roles-and-right';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useGetRoleAndRightsList } from '../RolesAndRightsHook/useGetRoleAndRightsList';
import { PAGINATION } from '@/config';
import {
  emptySelectedRoleAndRightsLists,
  setIsPortalClose,
  setPage,
} from '@/redux/slices/airLoyaltyProgram/roles-and-right/slice';

export const useDeleteRolesAndRight = () => {
  const [
    deleteLoyaltyProgramRoleAndRightsSinglePermissionRoleTrigger,
    deleteLoyaltyProgramRoleAndRightsSinglePermissionRoleStatus,
  ] = useDeleteLoyaltyProgramRoleAndRightsSinglePermissionRoleMutation();

  const { getLoyaltyProgramRoleAndRightsList, page } =
    useGetRoleAndRightsList();

  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(
    (state) => state?.loyaltyProgramRoleAndRights?.isPortalOpen,
  );

  const selectedRoleAndRightsLists = useAppSelector(
    (state) => state?.loyaltyProgramRoleAndRights?.selectedRoleAndRightsLists,
  );

  const totalRecords = useAppSelector(
    (state) => state?.loyaltyProgramRoleAndRights?.totalRecords,
  );

  const refetchApi = async () => {
    const newPage =
      selectedRoleAndRightsLists?.length === totalRecords
        ? PAGINATION?.CURRENT_PAGE
        : page;
    dispatch(setPage<any>(newPage));
    await getLoyaltyProgramRoleAndRightsList?.();
  };

  const deleteRoleAndRights = async () => {
    const deleteRolesParameter = {
      pathParams: {
        roleId: selectedRoleAndRightsLists?.[ARRAY_INDEX?.ZERO]?._id,
      },
    };

    try {
      await deleteLoyaltyProgramRoleAndRightsSinglePermissionRoleTrigger(
        deleteRolesParameter,
      )?.unwrap();
      successSnackbar('Record deleted successfully');
      closeDeletePortal?.();
      await refetchApi?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeDeletePortal = () => {
    dispatch(emptySelectedRoleAndRightsLists());
    dispatch(setIsPortalClose());
  };

  const apiCallInProgress =
    deleteLoyaltyProgramRoleAndRightsSinglePermissionRoleStatus?.isLoading;

  return {
    deleteRoleAndRights,
    apiCallInProgress,
    closeDeletePortal,
    isPortalOpen,
  };
};
