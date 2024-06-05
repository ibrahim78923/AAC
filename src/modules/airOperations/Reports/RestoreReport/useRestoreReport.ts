import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useRestoreReport = (props: any) => {
  const { setIsPortalOpen, setSelectedReportLists, page, getReportListData } =
    props;

  const restoreReport = async () => {
    try {
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
  };
};
