import { PAGINATION } from '@/config';
import { useDeleteRestoreReportPermanentlyMutation } from '@/services/airOperations/reports';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useGetRestoreReportLists } from '../ReportHooks/useGetRestoreReportLists';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  emptySelectedRestoreReportsList,
  setIsPortalClose,
  setPage,
} from '@/redux/slices/airOperations/restore-reports/slice';

export const useDeleteReportPermanently = () => {
  const [
    deleteRestoreReportPermanentlyTrigger,
    deleteRestoreReportPermanentlyStatus,
  ] = useDeleteRestoreReportPermanentlyMutation();

  const { getRestoreReportsList, page } = useGetRestoreReportLists();

  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(
    (state) => state?.operationsRestoreReportsLists?.isPortalOpen,
  );

  const selectedRestoreReportsList = useAppSelector(
    (state) => state?.operationsRestoreReportsLists?.selectedRestoreReportsList,
  );

  const totalRecords = useAppSelector(
    (state) => state?.operationsRestoreReportsLists?.totalRecords,
  );

  const refetchApi = async () => {
    const newPage =
      selectedRestoreReportsList?.length === totalRecords
        ? PAGINATION?.CURRENT_PAGE
        : page;
    dispatch(setPage<any>(newPage));
    await getRestoreReportsList?.(newPage);
  };

  const deleteReport = async () => {
    const deleteParams = new URLSearchParams();

    selectedRestoreReportsList?.forEach(
      (reportId: { _id: string }) => deleteParams?.append('ids', reportId?._id),
    );

    const apiDataParameter = {
      queryParams: deleteParams,
    };

    try {
      await deleteRestoreReportPermanentlyTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Record deleted successfully');
      closeModal?.();
      await refetchApi?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeModal = () => {
    dispatch(emptySelectedRestoreReportsList());
    dispatch(setIsPortalClose());
  };

  return {
    deleteReport,
    closeModal,
    deleteRestoreReportPermanentlyStatus,
    isPortalOpen,
  };
};
