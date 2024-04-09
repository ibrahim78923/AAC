import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';

const STATUS_COLORS: { [key: string]: string } = {
  OPEN: 'success',
  CLOSED: 'error',
  RESOLVED: 'success',
  PENDING: 'warning',
  SPAMS: 'error',
};

export const chipColor = (status: string): string => {
  return STATUS_COLORS?.[status] ?? 'error';
};

export const addAssociationsButtonDynamic = (
  setNewIncident: any,
  setExistingIncident: any,
) => [
  {
    id: 1,
    title: 'New Incident',
    permissionKey: [
      AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.ADD_ASSOCIATION,
      ,
    ],
    handleClick: (closeMenu: any) => {
      setNewIncident?.(true);
      closeMenu();
    },
  },
  {
    id: 2,
    title: 'Existing Incident',
    permissionKey: [
      AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.ADD_ASSOCIATION,
      ,
    ],
    handleClick: (closeMenu: any) => {
      setExistingIncident?.(true);
      closeMenu();
    },
  },
];
