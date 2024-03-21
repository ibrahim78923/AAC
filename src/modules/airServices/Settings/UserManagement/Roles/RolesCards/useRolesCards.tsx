import { useDeleteRoleMutation } from '@/services/airServices/settings/user-management/roles';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function useRolesCards() {
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
    } catch (error: any) {
      errorSnackbar();
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
