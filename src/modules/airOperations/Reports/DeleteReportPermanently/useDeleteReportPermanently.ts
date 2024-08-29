import { PAGINATION } from '@/config';
import { useDeleteRestoreReportPermanentlyMutation } from '@/services/airOperations/reports';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { RestoreReportsListsComponentPropsI } from '../RestoreReportsLists/RestoreReportsLists.interface';

export const useDeleteReportPermanently = (
  props: RestoreReportsListsComponentPropsI,
) => {
  const {
    setIsPortalOpen,
    selectedReportLists,
    setSelectedReportLists,
    setPage,
    totalRecords,
    page,
    getRestoreReportsList,
  } = props;

  const [
    deleteRestoreReportPermanentlyTrigger,
    deleteRestoreReportPermanentlyStatus,
  ] = useDeleteRestoreReportPermanentlyMutation();

  const deleteReport = async () => {
    const deleteParams = new URLSearchParams();

    selectedReportLists?.forEach(
      (reportId: { _id: string }) => deleteParams?.append('ids', reportId?._id),
    );

    const apiDataParameter = {
      queryParams: deleteParams,
    };

    try {
      await deleteRestoreReportPermanentlyTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Record deleted successfully');
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
    deleteReport,
    closeModal,
    deleteRestoreReportPermanentlyStatus,
  };
};
