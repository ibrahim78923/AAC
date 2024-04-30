import { useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import {
  useDeleteProductUserMutation,
  useUpdateProductsUsersMutation,
} from '@/services/airMarketer/settings/users';
import { enqueueSnackbar } from 'notistack';
import { getSession } from '@/utils';
import { useGetCompanyAccountsRolesQuery } from '@/services/common-APIs';

const useUsers: any = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const theme = useTheme<Theme>();
  const open = Boolean(anchorEl);
  const [updateProductsUsers] = useUpdateProductsUsersMutation();
  const [deleteProductUser, { isLoading: deleteProductUsersLoading }] =
    useDeleteProductUserMutation();
  const { user }: any = getSession();
  const ACTIVE = 'ACTIVE';
  const INACTIVE = 'INACTIVE';

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { data: rolesByCompanyId } = useGetCompanyAccountsRolesQuery({
    organizationId: user?.organization?._id,
  });

  const handleUpdateStatus = async (id: any, value: any) => {
    const statusVal = value?.target?.checked ? ACTIVE : INACTIVE;
    try {
      await updateProductsUsers({
        id: id,
        body: { status: statusVal },
      })?.unwrap();
      enqueueSnackbar('Status updated successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: 'error',
      });
    }
  };

  const deleteHandler = async (ids: any) => {
    try {
      await deleteProductUser({ body: { ids: ids } })?.unwrap();
      enqueueSnackbar('Users deleted successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: 'error',
      });
    }
  };

  return {
    isOpenDelete,
    setIsOpenDelete,
    anchorEl,
    setAnchorEl,
    open,
    theme,
    handleClick,
    handleClose,
    rolesByCompanyId,
    handleUpdateStatus,
    deleteHandler,
    deleteProductUsersLoading,
  };
};

export default useUsers;
