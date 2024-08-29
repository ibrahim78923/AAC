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
  setNewIncident: React.Dispatch<React.SetStateAction<boolean>>,
  setExistingIncident: React.Dispatch<React.SetStateAction<boolean>>,
) => [
  {
    id: 1,
    title: 'New Incident',
    permissionKey: [
      AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.ADD_ASSOCIATION,
      ,
    ],
    handleClick: (closeMenu: () => void) => {
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
    handleClick: (closeMenu: () => void) => {
      setExistingIncident?.(true);
      closeMenu();
    },
  },
];
