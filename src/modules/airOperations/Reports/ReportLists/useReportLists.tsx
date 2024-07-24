import { PAGINATION } from '@/config';
import { useEffect, useState } from 'react';
import {
  EXPORT_FILE_TYPE,
  EXPORT_TYPE,
  SELECTED_ARRAY_LENGTH,
} from '@/constants/strings';
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
import { downloadFile, exportDataToCSV, exportDataToXLS } from '@/utils/file';
import { useAddReportToFavoriteListMutation } from '@/services/airOperations/reports';
import { ManageReportAccess } from '../ManageReportAccess';
import { AddToDashboardReport } from '../AddToDashboardReport';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { fullName } from '@/utils/avatarUtils';
import { MANAGE_REPORTS_ACCESS_TYPES_MAPPED } from '@/constants/api-mapped';

export const useReportLists = (props: any) => {
  const {
    filter = [],
    apiQuery,
    exportApiQuery,
    editReportPath,
    permission,
    baseModule,
  } = props;
  const [search, setSearch] = useState('');
  const [selectedReportLists, setSelectedReportLists] = useState<any>([]);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [isPortalOpen, setIsPortalOpen] = useState<any>({});
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
    const getReportParam: any = buildQueryParams(
      additionalParams,
      filterReports,
    );

    const apiDataParameter = {
      queryParams: getReportParam,
    };

    try {
      await lazyGetReportsListTrigger?.(apiDataParameter)?.unwrap();
    } catch (error: any) {}
  };

  useEffect(() => {
    getReportsList?.();
  }, [page, pageLimit, search, reportFilters]);

  const addReportToFavorite = async (e: any, id: any) => {
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
      successSnackbar?.('Report added to favourite');
      const newPage =
        lazyGetReportsListStatus?.data?.data?.genericReports?.length ===
        SELECTED_ARRAY_LENGTH?.ONE
          ? PAGINATION?.CURRENT_PAGE
          : page;
      setPage?.(newPage);
      await getReportsList?.(newPage);
    } catch (error: any) {
      errorSnackbar?.(error?.data?.message);
      const newPage =
        lazyGetReportsListStatus?.data?.data?.genericReports?.length ===
        SELECTED_ARRAY_LENGTH?.ONE
          ? PAGINATION?.CURRENT_PAGE
          : page;
      setPage?.(newPage);
      await getReportsList?.(newPage);
    }
  };

  const handleFileExportSubmit = async (type: any) => {
    const exportData =
      lazyGetReportsListStatus?.data?.data?.genericReports?.map(
        (item: any) => ({
          'Report Owner': fullName(
            item?.owner?.firstName,
            item?.owner?.lastName,
          ),
          'Report Name': item?.name ?? '---',
          Dashboard: item?.dashboard?.name ?? '---',
          Type: item?.type ?? '---',
          'Created Date': !!item?.createdAt
            ? dayjs(item?.createdAt)?.format(DATE_FORMAT?.UI)
            : '---',
          Assigned:
            MANAGE_REPORTS_ACCESS_TYPES_MAPPED?.[item?.accessLevel?.type] ??
            '---',
          'Last Updated Date': !!item?.updatedAt
            ? dayjs(item?.updatedAt)?.format(DATE_FORMAT?.UI)
            : '---',
        }),
      );

    if (type === EXPORT_TYPE?.CSV) {
      exportDataToCSV?.(exportData, 'ReportsLists', EXPORT_FILE_TYPE?.[type]);
      successSnackbar(`File Exported successfully`);
      setIsPortalOpen({});
      return;
    }
    if (type === EXPORT_TYPE?.XLS) {
      exportDataToXLS?.(exportData, 'ReportsLists', EXPORT_FILE_TYPE?.[type]);
      successSnackbar(`File Exported successfully`);
      setIsPortalOpen({});
      return;
    }
  };

  const handleFileExportSubmits = async (type: any) => {
    const additionalParams = [
      ['page', page + ''],
      ['limit', pageLimit + ''],
      ['search', search],
      ...(filter ? [['filter', filter]] : []),
    ];

    const getReportParam: any = buildQueryParams(
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

  const portalComponentProps = {
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
          onSubmit={(exportType: any) => handleFileExportSubmit?.(exportType)}
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
    handleFileExportSubmits,
  };
};
