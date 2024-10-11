import { useEffect, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { PAGINATION } from '@/config';
import {
  useChangeServicesDashboardSingleDashboardDefaultStatusMutation,
  useLazyGetServicesDashboardListQuery,
} from '@/services/airServices/dashboard';
import { buildQueryParams, errorSnackbar } from '@/utils/api';
import { ManageDashboardFilter } from '../ManageDashboardFilter';
import { PreviewDashboard } from '../PreviewDashboard';
import { DeleteDashboard } from '../DeleteDashboard';
import { manageDashboardsDataColumnsDynamic } from './ManageDashboard.data';
import { getActivePermissionsSession } from '@/utils';
import {
  ManageDashboardIsPortalOpenI,
  ManageDashboardPortalComponentPropsI,
} from './ManageDashboard.interface';
import useAuth from '@/hooks/useAuth';
import { AIR_SERVICES } from '@/constants';

const { DASHBOARD, CREATE_DASHBOARD } = AIR_SERVICES ?? {};
const { CURRENT_PAGE, PAGE_LIMIT } = PAGINATION ?? {};

export const useManageDashboard = () => {
  const router: NextRouter = useRouter();
  const [dashboardFilterLists, setDashboardFilterLists] = useState({});
  const [page, setPage] = useState<number>(CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGE_LIMIT);
  const [search, setSearch] = useState<string>('');
  const [isPortalOpen, setIsPortalOpen] =
    useState<ManageDashboardIsPortalOpenI>({});

  const auth: any = useAuth();

  const user = auth?.user ?? {};
  const productId = auth?.product?._id ?? {};

  const overallPermissions = getActivePermissionsSession();

  const [lazyGetDashboardTrigger, lazyGetDashboardStatus] =
    useLazyGetServicesDashboardListQuery();

  const [
    changeDefaultServicesDashboardTrigger,
    changeDefaultServicesDashboardStatus,
  ] = useChangeServicesDashboardSingleDashboardDefaultStatusMutation?.();

  const getDashboardListData = async (currentPage = page) => {
    const additionalParams = [
      ['page', currentPage + ''],
      ['limit', pageLimit + ''],
      ['search', search],
      ['productId', productId],
    ];

    const getDashboardParam: URLSearchParams = buildQueryParams(
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

  const changeDefaultDashboard = async (e: any, data: any) => {
    const apiDataParameter = {
      body: {
        id: data?._id,
        isDefault: e?.target?.checked,
      },
    };

    try {
      await changeDefaultServicesDashboardTrigger(apiDataParameter)?.unwrap();
    } catch (error: any) {
      errorSnackbar?.(error?.data?.message);
    }
  };

  const portalComponentProps: ManageDashboardPortalComponentPropsI = {
    isPortalOpen: isPortalOpen,
    setIsPortalOpen: setIsPortalOpen,
    dashboardFilterLists: dashboardFilterLists,
    setDashboardFilterLists: setDashboardFilterLists,
    setPage: setPage,
    page: page,
    totalRecords: lazyGetDashboardStatus?.data?.dynamicdashboards?.length,
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

  const handleSearch = (data: any) => {
    setPage(CURRENT_PAGE);
    setSearch(data);
  };

  const manageDashboardsDataColumns = manageDashboardsDataColumnsDynamic?.(
    setIsPortalOpen,
    changeDefaultDashboard,
    changeDefaultServicesDashboardStatus,
    overallPermissions,
    user,
  );

  const moveToDashboard = () => router?.push(DASHBOARD);
  const moveToCreateDashboard = () => router?.push(CREATE_DASHBOARD);
  const openFilterPortal = () =>
    setIsPortalOpen({ isOpen: true, isFilter: true });

  return {
    setPage,
    setPageLimit,
    lazyGetDashboardStatus,
    renderPortalComponent,
    isPortalOpen,
    manageDashboardsDataColumns,
    getDashboardListData,
    page,
    moveToDashboard,
    moveToCreateDashboard,
    openFilterPortal,
    handleSearch,
  };
};
