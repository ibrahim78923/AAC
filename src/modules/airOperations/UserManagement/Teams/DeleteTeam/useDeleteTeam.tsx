import { PAGINATION } from '@/config';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { useDeleteTeamUsersMutation } from '@/services/airOperations/user-management/user';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useDeleteTeam = (props: any) => {
  const {
    setPage,
    totalRecords,
    page,
    getTeamListData,
    setIsPortalOpen,
    isPortalOpen,
  } = props;

  const [deleteTeamUsersTrigger, deleteTeamUsersStatus] =
    useDeleteTeamUsersMutation();

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
      const newPage =
        totalRecords === SELECTED_ARRAY_LENGTH?.ONE
          ? PAGINATION?.CURRENT_PAGE
          : page;
      setPage?.(newPage);
      await getTeamListData?.(newPage);
    } catch (error: any) {
      errorSnackbar(error?.data?.message ?? error?.message);
    }
  };

  const closeTeamDeleteModal = () => {
    setIsPortalOpen?.({});
  };

  return {
    deleteTeam,
    closeTeamDeleteModal,
    deleteTeamUsersStatus,
  };
};
