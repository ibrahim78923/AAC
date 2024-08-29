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
import {
  RestoreReportListsIsPortalOpenI,
  RestoreReportsListsComponentPropsI,
  RestoreReportsListsPropsI,
} from './RestoreReportsLists.interface';
import { SingleDropdownOptionI } from '@/components/SingleDropdownButton/SingleDropdownButton.interface';

export const useRestoreReportsLists = (props: RestoreReportsListsPropsI) => {
  const { filter, apiQuery, permissions, baseModule } = props;
  const [search, setSearch] = useState<string>('');
  const [selectedReportLists, setSelectedReportLists] = useState<any>([]);
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);
  const [isPortalOpen, setIsPortalOpen] =
    useState<RestoreReportListsIsPortalOpenI>({});
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
    const getRestoreReportParam: URLSearchParams = buildQueryParams(
      additionalParams,
      filterReports,
    );

    const apiDataParameter = {
      queryParams: getRestoreReportParam,
    };

    try {
      await lazyGetRestoreReportsListTrigger?.(apiDataParameter)?.unwrap();
      setSelectedReportLists([]);
    } catch (error: any) {
      setSelectedReportLists([]);
    }
  };

  useEffect(() => {
    getRestoreReportsList?.();
  }, [page, pageLimit, search, reportFilters]);

  const restoreReportColumns = restoreReportColumnsDynamic?.(
    selectedReportLists,
    setSelectedReportLists,
    lazyGetRestoreReportsListStatus?.data?.data?.genericReports,
  );

  const portalComponentProps: RestoreReportsListsComponentPropsI = {
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

  const actionButtonDropdown: SingleDropdownOptionI[] =
    actionsForRestoreReportListsDynamic?.(setIsPortalOpen, permissions);

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
    page,
    getRestoreReportsList,
  };
};
