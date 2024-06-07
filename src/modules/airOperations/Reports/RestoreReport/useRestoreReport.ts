import { useRestoreDeletedReportMutation } from '@/services/airOperations/reports';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useRestoreReport = (props: any) => {
  const {
    setIsPortalOpen,
    setSelectedReportLists,
    page,
    getReportListData,
    selectedReportLists,
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
      setSelectedReportLists?.([]);
      closeModal?.();
      await getReportListData?.(page);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      closeModal?.();
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
