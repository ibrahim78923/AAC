import { PAGINATION } from '@/config';
import { useEffect, useState } from 'react';
import { buildQueryParams } from '@/utils/api';
import {
  actionsForRestoreReportListsDynamic,
  restoreReportColumnsDynamic,
} from './RestoreReportsLists.data';
import { RestoreReport } from '../RestoreReport';
import { RestoreReportsFilter } from '../RestoreReportsFilter';
import { DeleteReportPermanently } from '../DeleteReportPermanently';

export const useRestoreReportsLists = (props: any) => {
  const { filter, apiQuery, permissions, baseModule } = props;
  const [search, setSearch] = useState('');
  const [selectedReportLists, setSelectedReportLists] = useState<any>([]);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [isPortalOpen, setIsPortalOpen] = useState<any>({});
  const [reportFilters, setReportFilter] = useState<any>({});

  const [
    lazyGetRestoreReportsListTrigger,
    lazyGetRestoreReportsListStatus,
  ]: any = apiQuery;

  const getRestoreReportsList = async (
    currentPage = page,
    filterReports = reportFilters,
  ) => {
    const additionalParams = [
      ['page', currentPage + ''],
      ['limit', pageLimit + ''],
      ['search', search],
      ...(filter ? [['filter', filter]] : []),
      ...(baseModule ? [['baseModule', baseModule]] : []),
    ];
    const getRestoreReportParam: any = buildQueryParams(
      additionalParams,
      filterReports,
    );

    const apiDataParameter = {
      queryParams: getRestoreReportParam,
    };

    try {
      await lazyGetRestoreReportsListTrigger?.(apiDataParameter)?.unwrap();
    } catch (error: any) {}
  };

  useEffect(() => {
    getRestoreReportsList?.();
  }, [page, pageLimit, search, reportFilters]);

  const restoreReportColumns = restoreReportColumnsDynamic?.(
    selectedReportLists,
    setSelectedReportLists,
    lazyGetRestoreReportsListStatus?.data?.data?.genericReports,
  );

  const portalComponentProps = {
    isPortalOpen: isPortalOpen,
    setIsPortalOpen: setIsPortalOpen,
    setSelectedReportLists: setSelectedReportLists,
    selectedReportLists: selectedReportLists,
    reportFilters: reportFilters,
    setReportFilter: setReportFilter,
    getRestoreReportsList: getRestoreReportsList,
    page,
    setPage,
    totalRecords:
      lazyGetRestoreReportsListStatus?.data?.data?.genericReports?.length,
  };

  const renderPortalComponent = () => {
    if (isPortalOpen?.isRestore) {
      return <RestoreReport {...portalComponentProps} />;
    }

    if (isPortalOpen?.isDelete) {
      return <DeleteReportPermanently {...portalComponentProps} />;
    }

    if (isPortalOpen?.isFilter) {
      return <RestoreReportsFilter {...portalComponentProps} />;
    }

    return <></>;
  };

  const actionButtonDropdown = actionsForRestoreReportListsDynamic?.(
    setIsPortalOpen,
    permissions,
  );

  return {
    restoreReportColumns,
    setSearch,
    setPageLimit,
    setPage,
    lazyGetRestoreReportsListStatus,
    setIsPortalOpen,
    isPortalOpen,
    renderPortalComponent,
    actionButtonDropdown,
    setSelectedReportLists,
    selectedReportLists,
  };
};
