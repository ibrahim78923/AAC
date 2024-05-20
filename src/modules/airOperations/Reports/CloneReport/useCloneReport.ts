import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useCloneReport = (props: any) => {
  const { setIsPortalOpen, setSelectedReportLists, page, getReportListData } =
    props;

  const cloneReport = async () => {
    try {
      successSnackbar('Record clone successfully');
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
    cloneReport,
    closeModal,
  };
};
