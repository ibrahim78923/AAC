import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';

export const DASHBOARD_FILTER_PORTAL_ACTION = {
  SEND_EMAIL: 'Send Email',
  DOWNLOAD_DASHBOARD: 'Download Dashboard',
};

export const dashboardDropdownActionsDynamic = (
  setPortalAction: any,
  copyEmail: any,
) => [
  {
    id: 1,
    title: 'Copy Link',
    handleClick: (closeMenu: any) => {
      copyEmail();
      closeMenu?.();
    },
    permissionKey: [AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_MANAGE_DASHBOARD],
  },
  {
    id: 2,
    title: 'Download dashboard',
    handleClick: (closeMenu: any) => {
      setPortalAction(DASHBOARD_FILTER_PORTAL_ACTION?.DOWNLOAD_DASHBOARD);
      closeMenu?.();
    },
    permissionKey: [AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_MANAGE_DASHBOARD],
  },
  {
    id: 3,
    title: 'Email this dashboard',
    handleClick: (closeMenu: any) => {
      setPortalAction(DASHBOARD_FILTER_PORTAL_ACTION?.SEND_EMAIL);
      closeMenu?.();
    },
    permissionKey: [AIR_SERVICES_DASHBOARD_PERMISSIONS?.SHARE_DASHBOARD],
  },
];
