import React, { useState } from 'react';
import { userDefaultValues, userValidationSchema } from './Users.data';
import { Theme, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePostPoductUserMutation } from '@/services/airSales/settings/users';
import { enqueueSnackbar } from 'notistack';
import { useGetCompanyAccountsRolesQuery } from '@/services/common-APIs';

const useUsers = (setIsAddUserDrawer?: any) => {
  const [checkedUser, setCheckedUser] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const theme = useTheme<Theme>();
  const [postPoductUser] = usePostPoductUserMutation();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { data: rolesByCompanyId } = useGetCompanyAccountsRolesQuery({
    organizationId: '65dc64bbb454e252cbe9a416',
  });
  const methods: any = useForm({
    resolver: yupResolver(userValidationSchema),
    defaultValues: userDefaultValues,
  });
  const { handleSubmit } = methods;
  const onSubmit = async (values: any) => {
    try {
      await postPoductUser({ body: values })?.unwrap();
      enqueueSnackbar('User added successfully', {
        variant: 'success',
      });
      setIsAddUserDrawer({ isToggle: false, type: 'add', data: {} });
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
    methods,
    handleSubmit,
    onSubmit,
    checkedUser,
    setCheckedUser,
    rolesByCompanyId,
  };
};

export default useUsers;
