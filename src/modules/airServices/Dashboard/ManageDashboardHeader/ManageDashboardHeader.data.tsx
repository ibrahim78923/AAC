import dynamic from 'next/dynamic';
import { SERVICES_DASHBOARD_PORTAL_ACTIONS_CONSTANT } from '../Dashboard.data';
import LazyLoadingFlow from '@/components/LazyLoadingFlow';

const DeleteDashboard = dynamic(() => import('../DeleteDashboard'), {
  ssr: false,
  loading: (options: any) => (
    <LazyLoadingFlow
      name="delete dashboard"
      isLoading={options?.isLoading}
      error={options?.error}
    />
  ),
});

const ManageDashboardFilter = dynamic(
  () => import('../ManageDashboardFilter'),
  {
    ssr: false,
    loading: (options: any) => (
      <LazyLoadingFlow
        name="filter dashboard"
        isLoading={options?.isLoading}
        error={options?.error}
      />
    ),
  },
);

const PreviewDashboard = dynamic(() => import('../PreviewDashboard'), {
  ssr: false,
  loading: (options: any) => (
    <LazyLoadingFlow
      name="view dashboard"
      isLoading={options?.isLoading}
      error={options?.error}
    />
  ),
});

export const renderPortalComponent = {
  [SERVICES_DASHBOARD_PORTAL_ACTIONS_CONSTANT?.DELETE_DASHBOARD]: (
    <DeleteDashboard />
  ),
  [SERVICES_DASHBOARD_PORTAL_ACTIONS_CONSTANT?.FILTER_DASHBOARD]: (
    <ManageDashboardFilter />
  ),
  [SERVICES_DASHBOARD_PORTAL_ACTIONS_CONSTANT?.SINGLE_DASHBOARD_DETAILS]: (
    <PreviewDashboard />
  ),
};
