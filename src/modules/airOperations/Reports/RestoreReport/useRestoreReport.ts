import { PAGINATION } from '@/config';
import { useRestoreDeletedReportMutation } from '@/services/airOperations/reports';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useRestoreReport = (props: any) => {
  const {
    setIsPortalOpen,
    selectedReportLists,
    setSelectedReportLists,
    setPage,
    totalRecords,
    page,
    getRestoreReportsList,
  } = props;
  const [restoreDeletedReportTrigger, restoreDeletedReportStatus] =
    useRestoreDeletedReportMutation();

  const restoreReport = async () => {
    const apiQueryParams = new URLSearchParams();

    selectedReportLists?.forEach(
      (reportId: any) => apiQueryParams?.append('ids', reportId?._id),
    );

    const apiDataParameter = {
      queryParams: apiQueryParams,
    };

    try {
      await restoreDeletedReportTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Report restore successfully');
      closeModal?.();
      const newPage =
        selectedReportLists?.length === totalRecords
          ? PAGINATION?.CURRENT_PAGE
          : page;
      setPage?.(newPage);
      await getRestoreReportsList?.(newPage);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const closeModal = () => {
    setSelectedReportLists?.([]);
    setIsPortalOpen?.({});
  };

  return {
    restoreReport,
    closeModal,
    restoreDeletedReportStatus,
  };
};
