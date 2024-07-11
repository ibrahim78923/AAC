import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PAGINATION } from '@/config';
import {
  useChangeDefaultServicesDashboardMutation,
  useLazyGetServicesDashboardListQuery,
} from '@/services/airServices/dashboard';
import { buildQueryParams, errorSnackbar } from '@/utils/api';
import { ManageDashboardFilter } from './ManageDashboardFilter';
import { PreviewDashboard } from '../PreviewDashboard';
import { DeleteDashboard } from './DeleteDashboard';
import { manageDashboardsDataColumnsDynamic } from './ManageDashboard.data';

export const useManageDashboard = () => {
  const matches = useMediaQuery('(max-width:590px)');
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [dashboardFilterLists, setDashboardFilterLists] = useState({});
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState('');
  const [isPortalOpen, setIsPortalOpen] = useState<any>({});

  const [lazyGetDashboardTrigger, lazyGetDashboardStatus] =
    useLazyGetServicesDashboardListQuery();

  const [
    changeDefaultServicesDashboardTrigger,
    changeDefaultServicesDashboardStatus,
  ] = useChangeDefaultServicesDashboardMutation?.();

  const getDashboardListData = async (currentPage = page) => {
    const additionalParams = [
      ['page', currentPage + ''],
      ['limit', pageLimit + ''],
      ['search', search],
    ];
    const getDashboardParam: any = buildQueryParams(
      additionalParams,
      dashboardFilterLists,
    );

    const getDashboardParameter = {
      queryParams: getDashboardParam,
    };

    try {
      await lazyGetDashboardTrigger(getDashboardParameter)?.unwrap();
    } catch (error: any) {}
  };

  useEffect(() => {
    getDashboardListData();
  }, [search, page, pageLimit, dashboardFilterLists]);

  const changeDefaultDashboard = async (e: any, id: string) => {
    const apiDataParameter = {
      body: {
        id,
        isDefault: true,
      },
    };

    try {
      await changeDefaultServicesDashboardTrigger(apiDataParameter)?.unwrap();
    } catch (error: any) {
      errorSnackbar?.(error?.data?.message);
    }
  };

  const portalComponentProps = {
    isPortalOpen: isPortalOpen,
    setIsPortalOpen: setIsPortalOpen,
    dashboardFilterLists: dashboardFilterLists,
    setDashboardFilterLists: setDashboardFilterLists,
    setPage: setPage,
    page: page,
    totalRecords: lazyGetDashboardStatus?.data?.data?.length,
    getDashboardListData: getDashboardListData,
  };

  const renderPortalComponent = () => {
    if (isPortalOpen?.isView) {
      return <PreviewDashboard {...portalComponentProps} />;
    }
    if (isPortalOpen?.isDelete) {
      return <DeleteDashboard {...portalComponentProps} />;
    }
    if (isPortalOpen?.isFilter) {
      return <ManageDashboardFilter {...portalComponentProps} />;
    }
    return <></>;
  };
  const manageDashboardsDataColumns = manageDashboardsDataColumnsDynamic?.(
    setIsPortalOpen,
    changeDefaultDashboard,
    changeDefaultServicesDashboardStatus,
  );
  return {
    matches,
    isDrawerOpen,
    setIsDrawerOpen,
    router,
    setPage,
    setPageLimit,
    setSearch,
    lazyGetDashboardStatus,
    renderPortalComponent,
    isPortalOpen,
    setIsPortalOpen,
    manageDashboardsDataColumns,
  };
};
