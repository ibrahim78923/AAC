import { PAGINATION } from '@/config';
import { useDeleteRestoreReportPermanentlyMutation } from '@/services/airOperations/reports';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useDeleteReportPermanently = (props: any) => {
  const {
    setIsPortalOpen,
    selectedReportLists,
    setSelectedReportLists,
    setPage,
    totalRecords,
    page,
    getReportListData,
  } = props;

  const [
    deleteRestoreReportPermanentlyTrigger,
    deleteRestoreReportPermanentlyStatus,
  ] = useDeleteRestoreReportPermanentlyMutation();

  const deleteReport = async () => {
    const deleteParams = new URLSearchParams();

    selectedReportLists?.forEach(
      (reportId: any) => deleteParams?.append('ids', reportId?._id),
    );

    const apiDataParameter = {
      queryParams: deleteParams,
    };

    try {
      await deleteRestoreReportPermanentlyTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Record deleted successfully');
      setSelectedReportLists?.([]);
      closeModal?.();
      const newPage =
        selectedReportLists?.length === totalRecords
          ? PAGINATION?.CURRENT_PAGE
          : page;
      setPage?.(newPage);
      await getReportListData?.(newPage);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeModal = () => {
    setSelectedReportLists?.([]);
    setIsPortalOpen?.({});
  };

  return {
    deleteReport,
    closeModal,
    deleteRestoreReportPermanentlyStatus,
  };
};
