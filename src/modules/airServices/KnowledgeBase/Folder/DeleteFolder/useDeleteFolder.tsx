import { PAGINATION } from '@/config';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { useDeleteDynamicServicesDashboardMutation } from '@/services/airServices/dashboard';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useDeleteFolder = (props: any) => {
  const {
    setPage,
    totalRecords,
    page,
    getFolderListData,
    setIsPortalOpen,
    isPortalOpen,
  } = props;

  const [deleteSingleServicesFolderTrigger, deleteSingleServicesFolderStatus] =
    useDeleteDynamicServicesDashboardMutation();

  const deleteFolder = async () => {
    const apiDataParameter = {
      queryParams: {
        ids: isPortalOpen?.data?._id,
      },
    };
    try {
      await deleteSingleServicesFolderTrigger(apiDataParameter)?.unwrap();
      successSnackbar?.('Folder deleted successfully!');
      closeFolderDeleteModal?.();
      const newPage =
        totalRecords === SELECTED_ARRAY_LENGTH?.ONE
          ? PAGINATION?.CURRENT_PAGE
          : page;
      setPage?.(newPage);
      await getFolderListData?.(newPage);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeFolderDeleteModal = () => {
    setIsPortalOpen?.({});
  };

  return {
    deleteFolder,
    deleteSingleServicesFolderStatus,
    closeFolderDeleteModal,
  };
};
