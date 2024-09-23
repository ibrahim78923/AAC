import { useEffect, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { PAGINATION } from '@/config';
import {
  useChangeDefaultServicesDashboardMutation,
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

export const useManageDashboard = () => {
  const router: NextRouter = useRouter();
  const [dashboardFilterLists, setDashboardFilterLists] = useState({});
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<string>('');
  const [isPortalOpen, setIsPortalOpen] =
    useState<ManageDashboardIsPortalOpenI>({});

  const auth: any = useAuth();

  const { user } = auth;
  const { _id: productId } = auth?.product;

  const overallPermissions = getActivePermissionsSession();

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
  const manageDashboardsDataColumns = manageDashboardsDataColumnsDynamic?.(
    setIsPortalOpen,
    changeDefaultDashboard,
    changeDefaultServicesDashboardStatus,
    overallPermissions,
    user,
  );
  return {
    router,
    setPage,
    setPageLimit,
    setSearch,
    lazyGetDashboardStatus,
    renderPortalComponent,
    isPortalOpen,
    setIsPortalOpen,
    manageDashboardsDataColumns,
    getDashboardListData,
    page,
  };
};
