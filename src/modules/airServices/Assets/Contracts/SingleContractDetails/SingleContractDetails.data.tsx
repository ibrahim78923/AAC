import { AIR_SERVICES } from '@/constants';
import { AIR_SERVICES_ASSETS_CONTRACTS_PERMISSIONS } from '@/constants/permission-keys';
import { CONTRACT_STATUS } from '@/constants/strings';

export const singleContractDetailsActionDropdownFunction = (
  setDeleteModalOpen: any,
  setTerminateModalOpen: any,
  router: any,
  data: any,
) => [
  {
    id: 1,
    permissionKey: [
      AIR_SERVICES_ASSETS_CONTRACTS_PERMISSIONS?.VIEW_TASK_DETAILS,
    ],
    title: 'Edit',
    handleClick: (closeMenu: any) => {
      router?.push({
        pathname: AIR_SERVICES?.UPSERT_CONTRACT,
        query: {
          ...router?.query,
          action: 'edit',
        },
      });
      closeMenu?.();
    },
  },
  {
    id: 2,
    permissionKey: [
      AIR_SERVICES_ASSETS_CONTRACTS_PERMISSIONS?.DELETE_CONTRACTS,
    ],
    title: 'Delete',
    handleClick: (closeMenu: any) => {
      setDeleteModalOpen?.(true);
      closeMenu?.();
    },
  },
  {
    id: 3,
    permissionKey: [
      AIR_SERVICES_ASSETS_CONTRACTS_PERMISSIONS?.VIEW_TASK_DETAILS,
    ],
    title: 'Renew',
    disabled: data?.data?.status !== CONTRACT_STATUS?.ACTIVE,
    handleClick: (closeMenu: any) => {
      router?.push({
        pathname: AIR_SERVICES?.UPDATE_CONTRACT,
        query: {
          ...router?.query,
          action: 'renew',
        },
      });
      closeMenu?.();
    },
  },
  {
    id: 4,
    permissionKey: [
      AIR_SERVICES_ASSETS_CONTRACTS_PERMISSIONS?.VIEW_TASK_DETAILS,
    ],
    title: 'Extend',
    disabled: data?.data?.status !== CONTRACT_STATUS?.ACTIVE,
    handleClick: (closeMenu: any) => {
      router?.push({
        pathname: AIR_SERVICES?.UPDATE_CONTRACT,
        query: {
          ...router?.query,
          action: 'extend',
        },
      });
      closeMenu?.();
    },
  },
  {
    id: 5,
    permissionKey: [
      AIR_SERVICES_ASSETS_CONTRACTS_PERMISSIONS?.VIEW_TASK_DETAILS,
    ],
    title: 'Terminate',
    handleClick: (closeMenu: any) => {
      setTerminateModalOpen?.(true);
      closeMenu?.();
    },
  },
];
