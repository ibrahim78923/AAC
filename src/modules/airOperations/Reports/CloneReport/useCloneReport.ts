import { ARRAY_INDEX } from '@/constants/strings';
import { useCloneOperationsReportsMutation } from '@/services/airOperations/reports';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { PAGINATION } from '@/config';
import { useGetReportLists } from '../ReportHooks/useGetReportLists';
import {
  emptySelectedReportsList,
  setIsPortalClose,
  setPage,
} from '@/redux/slices/airOperations/reports/slice';

const { CURRENT_PAGE } = PAGINATION ?? {};
const { ZERO } = ARRAY_INDEX ?? {};

export const useCloneReport = () => {
  const { getReportsList, page } = useGetReportLists();
  const [cloneReportsTrigger, cloneReportsStatus] =
    useCloneOperationsReportsMutation();
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

  const cloneReport = async () => {
    const apiDataParameter = {
      queryParams: {
        id: selectedReportsList?.[ZERO]?._id,
      },
    };

    try {
      await cloneReportsTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Report clone successfully');
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
    cloneReport,
    closeModal,
    cloneReportsStatus,
    isPortalOpen,
  };
};
