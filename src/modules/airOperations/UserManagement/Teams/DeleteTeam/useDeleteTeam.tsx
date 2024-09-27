import { PAGINATION } from '@/config';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { useDeleteOperationsUserManagementSingleTeamMutation } from '@/services/airOperations/user-management/user';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useGetTeamsLists } from '../../UserManagementHooks/useGetTeamsLists';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  setIsPortalClose,
  setPage,
} from '@/redux/slices/airOperations/teams/slice';

export const useDeleteTeam = () => {
  const [deleteTeamUsersTrigger, deleteTeamUsersStatus] =
    useDeleteOperationsUserManagementSingleTeamMutation();

  const { getOperationTeamList, page } = useGetTeamsLists?.();

  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(
    (state) => state?.operationsTeam?.isPortalOpen,
  );

  const totalRecords = useAppSelector(
    (state) => state?.operationsTeam?.totalRecords,
  );

  const refetchApi = async () => {
    const newPage =
      totalRecords === SELECTED_ARRAY_LENGTH?.ONE
        ? PAGINATION?.CURRENT_PAGE
        : page;
    dispatch(setPage<any>(newPage));
    await getOperationTeamList?.();
  };

  const deleteTeam = async () => {
    const apiDataParameter = {
      queryParams: {
        ids: isPortalOpen?.data?._id,
      },
    };
    try {
      await deleteTeamUsersTrigger(apiDataParameter)?.unwrap();
      successSnackbar?.('Team deleted successfully!');
      closeTeamDeleteModal?.();
      await refetchApi?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message ?? error?.message);
    }
  };

  const closeTeamDeleteModal = () => {
    dispatch(setIsPortalClose());
  };

  return {
    deleteTeam,
    closeTeamDeleteModal,
    deleteTeamUsersStatus,
    isPortalOpen,
  };
};
