import CustomizePortal from './CustomizePortal';
import { Permissions } from './Permissions';
import { Settings } from './Settings';
import { AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS } from '@/constants/permission-keys';

export const managePortalTabsData = [
  {
    _id: 1,
    name: 'Customize Portal',
    id: 'customizePortal',
    tabPermissions: [
      AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS?.VIEW_AND_MANAGE_CUSTOMER_PORTAL_PERSONALIZATION,
    ],
    component: CustomizePortal,
  },
  {
    _id: 2,
    name: 'Permissions',
    id: 'permissions',
    tabPermissions: [
      AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS?.SET_CUSTOMER_PORTAL_PERMISSIONS,
    ],
    component: Permissions,
  },
  {
    _id: 3,
    name: 'Settings',
    id: 'settings',
    tabPermissions: [
      AIR_SERVICES_SETTINGS_ACCOUNT_SETTINGS_PERMISSIONS?.SET_CUSTOMER_PORTAL_SETTINGS,
    ],
    component: Settings,
  },
];
