import {
  setIsPortalOpen,
  setSearch,
} from '@/redux/slices/airOperations/reports/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { NextRouter, useRouter } from 'next/router';
import {
  REPORT_LISTS_ACTION_CONSTANTS,
  reportListsActionDropdownDynamic,
} from './ReportListsHeader.data';
import { PAGINATION } from '@/config';
import { PERMISSIONS_REPORTS } from '../ReportLists/ReportLists.data';
import { AIR_OPERATIONS } from '@/constants';

const { FILTER_REPORT } = REPORT_LISTS_ACTION_CONSTANTS ?? {};

export const useReportListsHeader = () => {
  const router: NextRouter = useRouter();
  const id = router?.query?.id;
  const baseModule = router?.query?.baseModule;

  const isPortalOpen = useAppSelector(
    (state) => state?.operationsReportsLists?.isPortalOpen,
  );

  const selectedReportsList = useAppSelector(
    (state) => state?.operationsReportsLists?.selectedReportsList,
  );

  const tabValue = useAppSelector(
    (state) => state?.operationsReportsLists?.tabValue,
  );

  const dispatch = useAppDispatch();

  const permission = PERMISSIONS_REPORTS?.[`${baseModule}${tabValue + ''}`];

  const editReportPath = (reportId: string) => {
    router?.push({
      pathname: AIR_OPERATIONS?.UPSERT_GENERIC_REPORTS,
      query: {
        id,
        reportId: reportId,
        moduleName: baseModule,
      },
    });
  };

  const setReportsListAction = (ticketActionQuery: string) => {
    dispatch(
      setIsPortalOpen<any>({
        isOpen: true,
        action: ticketActionQuery,
      }),
    );
  };

  const reportListsActionDropdown = reportListsActionDropdownDynamic?.(
    setReportsListAction,
    selectedReportsList,
    editReportPath,
    permission,
  );

  const handleSetSearch = (newSearch: any) => {
    dispatch(
      setSearch<any>({
        searchTerm: newSearch,
        page: PAGINATION?.CURRENT_PAGE,
      }),
    );
  };

  const openFilterPortal = () => setReportsListAction(FILTER_REPORT);

  const onRestoreClick = () => {
    router?.push({
      pathname: AIR_OPERATIONS?.RESTORE_REPORTS_LIST,
      query: { id, baseModule },
    });
  };

  return {
    isPortalOpen,
    handleSetSearch,
    router,
    selectedReportsList,
    reportListsActionDropdown,
    openFilterPortal,
    onRestoreClick,
    permission,
  };
};
