import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';

const { VIEW_MANAGE_DASHBOARD, SHARE_DASHBOARD } =
  AIR_SERVICES_DASHBOARD_PERMISSIONS ?? {};

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
    permissionKey: [VIEW_MANAGE_DASHBOARD],
  },
  {
    id: 2,
    title: 'Email this dashboard',
    handleClick: (closeMenu: any) => {
      setIsDrawerOpen(true);
      closeMenu?.();
    },
    permissionKey: [SHARE_DASHBOARD],
  },
];
