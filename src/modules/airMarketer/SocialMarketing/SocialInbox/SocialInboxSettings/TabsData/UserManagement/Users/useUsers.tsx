import { useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import {
  useDeleteProductUserMutation,
  useUpdateProductsUsersMutation,
} from '@/services/airMarketer/settings/users';
import { enqueueSnackbar } from 'notistack';
import { LOYALTY_RULE_STATUS, NOTISTACK_VARIANTS } from '@/constants/strings';

const useUsers = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const theme = useTheme<Theme>();
  const open = Boolean(anchorEl);
  const [updateProductsUsers, { isLoading: updateUserLoading }] =
    useUpdateProductsUsersMutation();
  const [deleteProductUser, { isLoading: deleteProductUsersLoading }] =
    useDeleteProductUserMutation();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateStatus = async (id: any, value: any) => {
    const statusVal = value?.target?.checked
      ? LOYALTY_RULE_STATUS?.ACTIVE
      : LOYALTY_RULE_STATUS?.IN_ACTIVE;
    try {
      await updateProductsUsers({
        id: id,
        body: { status: statusVal },
      })?.unwrap();
      enqueueSnackbar('Status updated successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const deleteHandler = async (ids: any) => {
    try {
      await deleteProductUser({ body: { ids: ids } })?.unwrap();
      enqueueSnackbar('Users deleted successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return {
    deleteProductUsersLoading,
    handleUpdateStatus,
    updateUserLoading,
    setIsOpenDelete,
    deleteHandler,
    isOpenDelete,
    handleClick,
    setAnchorEl,
    handleClose,
    anchorEl,
    theme,
    open,
  };
};

export default useUsers;
