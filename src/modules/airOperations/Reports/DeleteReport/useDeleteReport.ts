import { PAGINATION } from '@/config';
import { useDeleteOperationsMultipleReportsTemporaryMutation } from '@/services/airOperations/reports';
import { useGetReportLists } from '../ReportHooks/useGetReportLists';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  emptySelectedReportsList,
  setIsPortalClose,
  setPage,
} from '@/redux/slices/airOperations/reports/slice';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

const { CURRENT_PAGE } = PAGINATION ?? {};

export const useDeleteReport = () => {
  const [deleteReportTemporaryTrigger, deleteReportTemporaryStatus] =
    useDeleteOperationsMultipleReportsTemporaryMutation();

  const { getReportsList, page } = useGetReportLists();
  const dispatch = useAppDispatch();

  const isPortalOpen = useAppSelector(
    (state) => state?.operationsReportsLists?.isPortalOpen,
  );

  const selectedReportsList = useAppSelector(
    (state) => state?.operationsReportsLists?.selectedReportsList,
  );

  const totalRecords = useAppSelector(
    (state) => state?.operationsReportsLists?.totalRecords,
  );

  const refetchApi = async () => {
    const newPage =
      selectedReportsList?.length === totalRecords ? CURRENT_PAGE : page;
    dispatch(setPage<any>(newPage));
    await getReportsList?.(newPage);
  };

  const deleteReport = async () => {
    const deleteParams: URLSearchParams = new URLSearchParams();

    selectedReportsList?.forEach(
      (reportId: { _id: string }) => deleteParams?.append('ids', reportId?._id),
    );

    const apiDataParameter = {
      queryParams: deleteParams,
    };

    try {
      await deleteReportTemporaryTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Record deleted successfully');
      closeModal?.();
      await refetchApi?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeModal = () => {
    dispatch(emptySelectedReportsList());
    dispatch(setIsPortalClose());
  };

  return {
    deleteReport,
    closeModal,
    deleteReportTemporaryStatus,
    isPortalOpen,
  };
};
