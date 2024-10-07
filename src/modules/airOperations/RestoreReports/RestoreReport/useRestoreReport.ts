import { PAGINATION } from '@/config';
import { useRestoreOperationsTemporaryDeletedReportMutation } from '@/services/airOperations/reports';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useGetRestoreReportLists } from '../RestoreReportsHook/useGetRestoreReportLists';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  emptySelectedRestoreReportsList,
  setIsPortalClose,
  setPage,
} from '@/redux/slices/airOperations/restore-reports/slice';

export const useRestoreReport = () => {
  const [restoreDeletedReportTrigger, restoreDeletedReportStatus] =
    useRestoreOperationsTemporaryDeletedReportMutation();

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
  const restoreReport = async () => {
    const apiQueryParams = new URLSearchParams();

    selectedRestoreReportsList?.forEach(
      (reportId: { _id: string }) =>
        apiQueryParams?.append('ids', reportId?._id),
    );

    const apiDataParameter = {
      queryParams: apiQueryParams,
    };

    try {
      await restoreDeletedReportTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Report restore successfully');
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
    restoreReport,
    closeModal,
    restoreDeletedReportStatus,
    isPortalOpen,
  };
};
