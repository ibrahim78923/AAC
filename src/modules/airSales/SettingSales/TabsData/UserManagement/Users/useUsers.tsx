import React, { useState } from 'react';
import { userDefaultValues, userValidationSchema } from './Users.data';
import { Theme, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePostPoductUserMutation } from '@/services/airSales/settings/users';
import { enqueueSnackbar } from 'notistack';

const useUsers = () => {
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

  const methods: any = useForm({
    resolver: yupResolver(userValidationSchema),
    defaultValues: userDefaultValues,
  });
  const { handleSubmit } = methods;
  const onSubmit = (values: any) => {
    try {
      postPoductUser({ body: values })?.unwrap();
      enqueueSnackbar('User added successfully', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar('error', {
        variant: 'success',
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
  };
};

export default useUsers;
