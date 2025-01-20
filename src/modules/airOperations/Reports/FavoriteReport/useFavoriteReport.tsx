import { PAGINATION } from '@/config';
import { useChangeOperationsReportsFavoriteStatusMutation } from '@/services/airOperations/reports';
import { useGetReportLists } from '../ReportHooks/useGetReportLists';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { setPage } from '@/redux/slices/airOperations/reports/slice';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

const { CURRENT_PAGE } = PAGINATION ?? {};
const { ONE } = SELECTED_ARRAY_LENGTH ?? {};

export const useFavoriteReport = (props: any) => {
  const { reportId } = props;

  const { getReportsList, page } = useGetReportLists();

  const dispatch = useAppDispatch();

  const totalRecords = useAppSelector(
    (state) => state?.operationsReportsLists?.totalRecords,
  );

  const refetchApi = async () => {
    const newPage = totalRecords === ONE ? CURRENT_PAGE : page;
    dispatch(setPage<any>(newPage));
    await getReportsList?.(newPage);
  };

  const [addReportToFavoriteListTrigger, addReportToFavoriteListStatus]: any =
    useChangeOperationsReportsFavoriteStatusMutation?.();

  const addReportToFavorite = async (e: any, id: string) => {
    const body = {
      isFavorite: e?.target?.checked,
    };

    const apiDataParameter = {
      queryParams: {
        id,
      },
      body,
    };

    try {
      await addReportToFavoriteListTrigger(apiDataParameter)?.unwrap();
      const isRemoved = 'removed from';
      const isAdded = 'added to';
      successSnackbar?.(
        `Report is ${e?.target?.checked ? isAdded : isRemoved} favorite list`,
      );
      await refetchApi?.();
    } catch (error: any) {
      errorSnackbar?.(error?.data?.message);
    }
  };
  const showLoader =
    addReportToFavoriteListStatus?.isLoading &&
    addReportToFavoriteListStatus?.originalArgs?.queryParams?.id === reportId;

  return {
    showLoader,
    addReportToFavorite,
    addReportToFavoriteListStatus,
  };
};
