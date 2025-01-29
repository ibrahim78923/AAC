import { useRouter } from 'next/router';
import { useState } from 'react';
import { roleListActionDropdownDynamic } from './RolesList.data';

export const useRolesList = () => {
  const router: any = useRouter();

  const [openDeleteModal, setOpenDeleteModal] = useState({
    isOpen: false,
    roleId: null,
  });

  const roleListActionDropdown = (roleId: any) =>
    roleListActionDropdownDynamic(setOpenDeleteModal, router, roleId);

  return {
    router,
    setOpenDeleteModal,
    openDeleteModal,
    roleListActionDropdown,
  };
};
