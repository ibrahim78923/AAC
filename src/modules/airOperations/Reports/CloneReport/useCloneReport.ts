import { ARRAY_INDEX } from '@/constants/strings';
import { useCloneReportsMutation } from '@/services/airOperations/reports';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useCloneReport = (props: any) => {
  const {
    setIsPortalOpen,
    setSelectedReportLists,
    page,
    getReportListData,
    selectedReportLists,
  } = props;

  const [cloneReportsTrigger, cloneReportsStatus] = useCloneReportsMutation();

  const cloneReport = async () => {
    const apiDataParameter = {
      queryParams: {
        id: selectedReportLists?.[ARRAY_INDEX?.ZERO]?._id,
      },
    };

    try {
      await cloneReportsTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Report clone successfully');
      closeModal?.();
      await getReportListData?.(page);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const closeModal = () => {
    setSelectedReportLists?.([]);
    setIsPortalOpen?.({});
  };

  return {
    cloneReport,
    closeModal,
    cloneReportsStatus,
  };
};
