import { useDeleteRoleMutation } from '@/services/airServices/settings/user-management/roles';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function useRolesCards({
  page,
  setPage,
  rolesListData,
  data,
}: any) {
  const router: any = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [roleId, setRoleId] = useState<any>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const theme: any = useTheme();

  const [deleteRolesTrigger, deleteRolesStatus] = useDeleteRoleMutation();

  const handleSubmitDelete = async () => {
    try {
      await deleteRolesTrigger(roleId)?.unwrap();
      successSnackbar('Role Deleted Successfully!');
      setRoleId(null);
      setOpenDeleteModal(false);
      const newPage = data?.data?.companyaccountroles?.length === 1 ? 1 : page;
      setPage?.(newPage);
      await rolesListData?.(newPage);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      setRoleId(null);
      setOpenDeleteModal(false);
    }
  };

  return {
    router,
    setAnchorEl,
    setRoleId,
    id,
    open,
    anchorEl,
    theme,
    roleId,
    setOpenDeleteModal,
    openDeleteModal,
    handleSubmitDelete,
    deleteRolesStatus,
  };
}
