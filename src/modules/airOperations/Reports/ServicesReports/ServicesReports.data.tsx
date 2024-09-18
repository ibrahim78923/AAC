import {
  AIR_OPERATION_REPORTS_SERVICES_ALL_REPORTS_PERMISSIONS,
  AIR_OPERATION_REPORTS_SERVICES_CUSTOM_REPORTS_PERMISSIONS,
  AIR_OPERATION_REPORTS_SERVICES_DASHBOARD_REPORTS_PERMISSIONS,
  AIR_OPERATION_REPORTS_SERVICES_FAVOURITES_PERMISSIONS,
} from '@/constants/permission-keys';
import { ReportLists } from '../ReportLists';
import { DYNAMIC_REPORTS_TYPES } from '@/constants/strings';

export const TAB_CHANGED_FILTERED: any = {
  0: [],
  1: [['isFavorite', true + '']],
  2: [['type', DYNAMIC_REPORTS_TYPES?.DASHBOARD]],
  3: [['type', DYNAMIC_REPORTS_TYPES?.CUSTOM]],
};

export const servicesReportsListTabsDynamic = (canDisableTab: boolean) => {
  return [
    {
      _id: 1,
      name: 'All Reports',
      id: 'allReports',
      tabPermissions: Object?.values(
        AIR_OPERATION_REPORTS_SERVICES_ALL_REPORTS_PERMISSIONS ?? {},
      ),
      disabled: canDisableTab,
      component: ReportLists,
      componentProps: {},
    },
    {
      _id: 2,
      name: 'Favorite',
      id: 'favorite',
      tabPermissions: Object?.values(
        AIR_OPERATION_REPORTS_SERVICES_FAVOURITES_PERMISSIONS ?? {},
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
        AIR_OPERATION_REPORTS_SERVICES_DASHBOARD_REPORTS_PERMISSIONS ?? {},
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
        AIR_OPERATION_REPORTS_SERVICES_CUSTOM_REPORTS_PERMISSIONS ?? {},
      ),
      component: ReportLists,
      disabled: canDisableTab,
      componentProps: {},
    },
  ];
};
