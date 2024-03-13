import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';

export const dropDownMenus = (setIsBarChart: any) => [
  {
    id: 1,
    title: 'Priority',
    permissionKey: [AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD],
    handleClick: (closeMenu: any) => {
      setIsBarChart(false);
      closeMenu?.();
    },
  },
  {
    id: 2,
    title: 'Status',
    permissionKey: [AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD],
    handleClick: (closeMenu: any) => {
      setIsBarChart(true);
      closeMenu?.();
    },
  },
];
