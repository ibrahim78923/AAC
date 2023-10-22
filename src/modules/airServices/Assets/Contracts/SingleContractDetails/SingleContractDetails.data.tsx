export const singleContractDetailsActionDropdownFunction = (
  setDeleteModalOpen: any,
  setTerminateModalOpen: any,
  router: any,
) => [
  {
    title: 'Edit',
    handleClick: (x: any) => {
      x?.();
    },
  },
  {
    title: 'Delete',
    handleClick: (x: any) => {
      setDeleteModalOpen?.(true);
      x?.();
    },
  },
  {
    title: 'Renew',
    handleClick: (x: any) => {
      router.push({
        pathname: `/air-services/assets/contracts/detail/update-contract`,
        query: {
          ...router.query,
          action: 'renew',
        },
      });
      x?.();
    },
  },
  {
    title: 'Extend',
    handleClick: (x: any) => {
      router.push({
        pathname: `/air-services/assets/contracts/detail/update-contract`,
        query: {
          ...router.query,
          action: 'extend',
        },
      });
      x?.();
    },
  },
  {
    title: 'Terminate',
    handleClick: (x: any) => {
      setTerminateModalOpen?.(true);
      x?.();
    },
  },
];
