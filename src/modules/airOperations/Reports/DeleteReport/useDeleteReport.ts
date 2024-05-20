import { PAGINATION } from '@/config';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useDeleteReport = (props: any) => {
  const {
    setIsPortalOpen,
    selectedReportLists,
    setSelectedReportLists,
    setPage,
    totalRecords,
    page,
    getReportListData,
  } = props;

  const deleteReport = async () => {
    try {
      successSnackbar('Record delete successfully');
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
      closeModal?.();
    }
  };
  const closeModal = () => {
    setSelectedReportLists?.([]);
    setIsPortalOpen?.({});
  };

  return {
    deleteReport,
    closeModal,
  };
};
