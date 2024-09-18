import {
  AIR_OPERATION_REPORTS_SALES_ALL_REPORTS_PERMISSIONS,
  AIR_OPERATION_REPORTS_SALES_CUSTOM_REPORTS_PERMISSIONS,
  AIR_OPERATION_REPORTS_SALES_DASHBOARD_REPORTS_PERMISSIONS,
  AIR_OPERATION_REPORTS_SALES_FAVOURITES_PERMISSIONS,
} from '@/constants/permission-keys';
import { ReportLists } from '../ReportLists';

export const salesReportsListTabsDynamic = (canDisableTab: any) => {
  return [
    {
      _id: 1,
      name: 'All Reports',
      id: 'allReports',
      tabPermissions: Object?.values(
        AIR_OPERATION_REPORTS_SALES_ALL_REPORTS_PERMISSIONS ?? {},
      ),
      component: ReportLists,
      disabled: canDisableTab,
      componentProps: {},
    },
    {
      _id: 2,
      name: 'Favorite',
      id: 'favorite',
      tabPermissions: Object?.values(
        AIR_OPERATION_REPORTS_SALES_FAVOURITES_PERMISSIONS ?? {},
      ),
      component: ReportLists,
      disabled: canDisableTab,
      componentProps: {},
    },
    {
      _id: 3,
      name: 'Dashboard Reports',
      id: 'dashboardReports',
      tabPermissions: Object?.values(
        AIR_OPERATION_REPORTS_SALES_DASHBOARD_REPORTS_PERMISSIONS ?? {},
      ),
      component: ReportLists,
      disabled: canDisableTab,
      componentProps: {},
    },
    {
      _id: 4,
      name: 'Custom Reports',
      id: 'customReports',
      tabPermissions: Object?.values(
        AIR_OPERATION_REPORTS_SALES_CUSTOM_REPORTS_PERMISSIONS ?? {},
      ),
      component: ReportLists,
      disabled: canDisableTab,
      componentProps: {},
    },
  ];
};
