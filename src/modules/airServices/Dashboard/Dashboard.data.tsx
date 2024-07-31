import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';

export const dashboardDropdownActionsDynamic = (
  setIsDrawerOpen: any,
  copyEmail: any,
) => [
  {
    id: 1,
    title: 'Copy Link',
    handleClick: (closeMenu: any) => {
      copyEmail();
      closeMenu?.();
    },
    permissionKey: [AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD],
  },
  {
    id: 2,
    title: 'Email this dashboard',
    handleClick: (closeMenu: any) => {
      setIsDrawerOpen(true);
      closeMenu?.();
    },
    permissionKey: [AIR_SERVICES_DASHBOARD_PERMISSIONS?.SHARE_DASHBOARD],
  },
];

export const NO_DEFAULT_DASHBOARD = 'No Default Dashboard found!';
