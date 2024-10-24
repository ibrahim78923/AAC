import { SERVICES_DASHBOARD_PORTAL_ACTIONS_CONSTANT } from '../Dashboard.data';
import { DeleteDashboard } from '../DeleteDashboard';
import { ManageDashboardFilter } from '../ManageDashboardFilter';
import { PreviewDashboard } from '../PreviewDashboard';

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
