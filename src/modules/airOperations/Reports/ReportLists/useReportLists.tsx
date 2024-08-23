import { PAGINATION } from '@/config';
import { useEffect, useState } from 'react';
import { EXPORT_FILE_TYPE, SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { buildQueryParams, errorSnackbar, successSnackbar } from '@/utils/api';
import {
  actionsForReportListsDynamic,
  reportListsColumnsDynamic,
} from './ReportLists.data';
import { CloneReport } from '../CloneReport';
import { DeleteReport } from '../DeleteReport';
import { RenameReport } from '../RenameReport';
import { ChangeReportOwner } from '../ChangeReportOwner';
import { EmailReport } from '../EmailReport';
import { FilterReport } from '../FilterReport';
import { ExportModal } from '@/components/ExportModal';
import { downloadFile } from '@/utils/file';
import { useAddReportToFavoriteListMutation } from '@/services/airOperations/reports';
import { ManageReportAccess } from '../ManageReportAccess';
import { AddToDashboardReport } from '../AddToDashboardReport';
import {
  ReportListsIsPortalOpenI,
  ReportsListsComponentPropsI,
  ReportsListsPropsI,
} from './ReportLists.interface';

export const useReportLists = (props: ReportsListsPropsI) => {
  const {
    filter = [],
    apiQuery,
    exportApiQuery,
    editReportPath,
    permission,
    baseModule,
  } = props;
  const [search, setSearch] = useState<string>('');
  const [selectedReportLists, setSelectedReportLists] = useState<any>([]);
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);
  const [isPortalOpen, setIsPortalOpen] = useState<ReportListsIsPortalOpenI>(
    {},
  );
  const [reportFilters, setReportFilter] = useState<any>({});
  const [lazyGetReportsListTrigger, lazyGetReportsListStatus]: any = apiQuery;
  const [lazyExportReportsListTrigger]: any = exportApiQuery;

  const [addReportToFavoriteListTrigger, addReportToFavoriteListStatus]: any =
    useAddReportToFavoriteListMutation?.();

  const getReportsList = async (
    currentPage = page,
    filterReports = reportFilters,
  ) => {
    const additionalParams = [
      ['page', currentPage + ''],
      ['limit', pageLimit + ''],
      ['search', search],
      ...(!!filter?.length ? [...filter] : []),
      ...(baseModule ? [['baseModule', baseModule]] : []),
    ];
    const getReportParam: URLSearchParams = buildQueryParams(
      additionalParams,
      filterReports,
    );

    const apiDataParameter = {
      queryParams: getReportParam,
    };

    try {
      await lazyGetReportsListTrigger?.(apiDataParameter)?.unwrap();
      setSelectedReportLists([]);
    } catch (error: any) {
      setSelectedReportLists([]);
    }
  };

  useEffect(() => {
    getReportsList?.();
  }, [page, pageLimit, search, reportFilters]);

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
        `Report is ${e?.target?.checked ? isAdded : isRemoved} favorite`,
      );
      const newPage =
        lazyGetReportsListStatus?.data?.data?.genericReports?.length ===
        SELECTED_ARRAY_LENGTH?.ONE
          ? PAGINATION?.CURRENT_PAGE
          : page;
      setPage?.(newPage);
      await getReportsList?.(newPage);
    } catch (error: any) {
      errorSnackbar?.(error?.data?.message);
    }
  };

  const handleFileExportSubmit = async (type: string) => {
    const additionalParams = [
      ['exportType', type],
      ...(!!filter?.length ? [...filter] : []),
      ...(baseModule ? [['baseModule', baseModule]] : []),
    ];

    const getReportParam: URLSearchParams = buildQueryParams(
      additionalParams,
      reportFilters,
    );

    const apiDataParameter = {
      queryParams: getReportParam,
    };

    try {
      const response: any =
        await lazyExportReportsListTrigger(apiDataParameter)?.unwrap();
      downloadFile(response, 'ReportsLists', EXPORT_FILE_TYPE?.[type]);
      successSnackbar(`File Exported successfully`);
      setIsPortalOpen({});
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const reportListsColumns = reportListsColumnsDynamic?.(
    selectedReportLists,
    setSelectedReportLists,
    lazyGetReportsListStatus?.data?.data?.genericReports,
    addReportToFavorite,
    addReportToFavoriteListStatus,
  );

  const portalComponentProps: ReportsListsComponentPropsI = {
    isPortalOpen: isPortalOpen,
    setIsPortalOpen: setIsPortalOpen,
    setSelectedReportLists: setSelectedReportLists,
    selectedReportLists: selectedReportLists,
    reportFilters: reportFilters,
    setReportFilter: setReportFilter,
    getReportListData: getReportsList,
    page,
    setPage,
    totalRecords: lazyGetReportsListStatus?.data?.data?.genericReports?.length,
    baseModule,
  };

  const renderPortalComponent = () => {
    if (isPortalOpen?.isClone) {
      return <CloneReport {...portalComponentProps} />;
    }
    if (isPortalOpen?.isEmail) {
      return <EmailReport {...portalComponentProps} />;
    }
    if (isPortalOpen?.isChangeOwner) {
      return <ChangeReportOwner {...portalComponentProps} />;
    }
    if (isPortalOpen?.isRename) {
      return <RenameReport {...portalComponentProps} />;
    }
    if (isPortalOpen?.isDelete) {
      return <DeleteReport {...portalComponentProps} />;
    }
    if (isPortalOpen?.isFilter) {
      return <FilterReport {...portalComponentProps} />;
    }
    if (isPortalOpen?.isAddedToDashboard) {
      return <AddToDashboardReport {...portalComponentProps} />;
    }
    if (isPortalOpen?.isAccessManage) {
      return <ManageReportAccess {...portalComponentProps} />;
    }
    if (isPortalOpen?.isExport) {
      return (
        <ExportModal
          open={isPortalOpen?.isExport}
          onSubmit={(exportType: string) =>
            handleFileExportSubmit?.(exportType)
          }
          handleClose={() => setIsPortalOpen({})}
        />
      );
    }
    return <></>;
  };

  const actionButtonDropdown = actionsForReportListsDynamic?.(
    setIsPortalOpen,
    selectedReportLists,
    editReportPath,
    permission,
  );

  return {
    reportListsColumns,
    setSearch,
    setPageLimit,
    setPage,
    lazyGetReportsListStatus,
    setIsPortalOpen,
    isPortalOpen,
    renderPortalComponent,
    actionButtonDropdown,
    setSelectedReportLists,
    selectedReportLists,
    page,
    getReportsList,
  };
};
