import { useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import { useUpdateProductsUsersMutation } from '@/services/airSales/settings/users';
import { enqueueSnackbar } from 'notistack';
import { getSession } from '@/utils';
import { useGetCompanyAccountsRolesQuery } from '@/services/common-APIs';

const useUsers: any = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const theme = useTheme<Theme>();
  const open = Boolean(anchorEl);
  const [updateProductsUsers] = useUpdateProductsUsersMutation();
  const { user } = getSession();

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
    const statusVal = value?.target?.checked ? 'ACTIVE' : 'INACTIVE';
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
  };
};

export default useUsers;
