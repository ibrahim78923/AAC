import { Permissions } from './Permissions';
import { Settings } from './Settings';
import { AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS } from '@/constants/permission-keys';

export const managePortalTabsData = [
  {
    _id: 1,
    name: 'Permissions',
    id: 'permissions',
    tabPermissions: [
      AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS?.SET_CUSTOMER_PORTAL_PERMISSIONS,
    ],
    component: Permissions,
  },
  {
    _id: 2,
    name: 'Settings',
    id: 'settings',
    tabPermissions: [
      AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS?.SET_CUSTOMER_PORTAL_SETTINGS,
    ],
    component: Settings,
  },
];
