import { AIR_CUSTOMER_PORTAL_TICKETS_PERMISSIONS } from '@/constants/permission-keys';

export const allTicketsDropdownFunction = [
  {
    id: 2342,
    permissionKey: [AIR_CUSTOMER_PORTAL_TICKETS_PERMISSIONS?.FILTERS],
    title: 'All tickets',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
  {
    id: 4367,
    permissionKey: [AIR_CUSTOMER_PORTAL_TICKETS_PERMISSIONS?.FILTERS],
    title: 'Open or Pending',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
  {
    id: 5479,
    permissionKey: [AIR_CUSTOMER_PORTAL_TICKETS_PERMISSIONS?.FILTERS],
    title: 'Resolved or Closed',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
  {
    id: 9086,
    permissionKey: [AIR_CUSTOMER_PORTAL_TICKETS_PERMISSIONS?.FILTERS],
    title: 'Share with me',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
];

export const newTicketsDropdownFunction = [
  {
    title: 'Report an issue',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
  {
    title: 'request a Service',
    handleClick: (closeMenu: any) => {
      closeMenu?.();
    },
  },
];
