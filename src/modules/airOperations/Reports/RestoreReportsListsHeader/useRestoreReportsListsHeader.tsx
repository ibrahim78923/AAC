import {
  RESTORE_REPORT_LISTS_ACTION_CONSTANTS,
  actionsDropdownForRestoreReportListsDynamic,
} from './RestoreReportsListsHeader.data';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  setIsPortalOpen,
  setSearch,
} from '@/redux/slices/airOperations/restore-reports/slice';
import { PAGINATION } from '@/config';

const { FILTER_RESTORE_REPORT } = RESTORE_REPORT_LISTS_ACTION_CONSTANTS;

export const useRestoreReportsListsHeader = () => {
  const dispatch = useAppDispatch();

  const selectedRestoreReportsList = useAppSelector(
    (state) => state?.operationsRestoreReportsLists?.selectedRestoreReportsList,
  );
  const isPortalOpen = useAppSelector(
    (state) => state?.operationsRestoreReportsLists?.isPortalOpen,
  );

  const setRestoreReportsListAction = (ticketActionQuery: string) => {
    dispatch(
      setIsPortalOpen<any>({
        isOpen: true,
        action: ticketActionQuery,
      }),
    );
  };
  const actionsDropdownForRestoreReportLists =
    actionsDropdownForRestoreReportListsDynamic?.(setRestoreReportsListAction);

  const openFilterRestoreReportsPortal = () =>
    setRestoreReportsListAction?.(FILTER_RESTORE_REPORT);

  const handleSetSearch = (newSearch: any) => {
    dispatch(
      setSearch<any>({
        searchTerm: newSearch,
        page: PAGINATION?.CURRENT_PAGE,
      }),
    );
  };

  return {
    openFilterRestoreReportsPortal,
    actionsDropdownForRestoreReportLists,
    selectedRestoreReportsList,
    handleSetSearch,
    isPortalOpen,
  };
};
