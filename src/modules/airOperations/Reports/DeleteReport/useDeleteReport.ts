import { PAGINATION } from '@/config';
import { useDeleteReportTemporaryMutation } from '@/services/airOperations/reports';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { ReportsListsComponentPropsI } from '../Reports.interface';

export const useDeleteReport = (props: ReportsListsComponentPropsI) => {
  const {
    setIsPortalOpen,
    selectedReportLists,
    setSelectedReportLists,
    setPage,
    totalRecords,
    page,
    getReportListData,
  } = props;

  const [deleteReportTemporaryTrigger, deleteReportTemporaryStatus] =
    useDeleteReportTemporaryMutation();

  const deleteReport = async () => {
    const deleteParams = new URLSearchParams();

    selectedReportLists?.forEach(
      (reportId: any) => deleteParams?.append('ids', reportId?._id),
    );

    const apiDataParameter = {
      queryParams: deleteParams,
    };

    try {
      await deleteReportTemporaryTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Record deleted successfully');
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
    deleteReportTemporaryStatus,
  };
};
