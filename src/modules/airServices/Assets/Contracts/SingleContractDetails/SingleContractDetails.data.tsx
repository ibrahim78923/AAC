import { AIR_SERVICES } from '@/constants';

export const singleContractDetailsActionDropdownFunction = (
  setDeleteModalOpen: any,
  setTerminateModalOpen: any,
  router: any,
) => [
  {
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
    title: 'Delete',
    handleClick: (closeMenu: any) => {
      setDeleteModalOpen?.(true);
      closeMenu?.();
    },
  },
  {
    title: 'Renew',
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
    title: 'Extend',
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
    title: 'Terminate',
    handleClick: (closeMenu: any) => {
      setTerminateModalOpen?.(true);
      closeMenu?.();
    },
  },
];
