import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { TICKET_GRAPH_TYPES } from '@/constants/strings';

export const dropDownMenus = (setGraphType: any) => [
  {
    id: 1,
    title: 'Priority',
    permissionKey: [AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD],
    handleClick: (closeMenu: any) => {
      setGraphType(TICKET_GRAPH_TYPES?.PRIORITY);
      closeMenu?.();
    },
  },
  {
    id: 2,
    title: 'Status',
    permissionKey: [AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD],
    handleClick: (closeMenu: any) => {
      setGraphType(TICKET_GRAPH_TYPES?.STATUS);
      closeMenu?.();
    },
  },
];
