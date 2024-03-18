import React, { useState } from 'react';
import { userValidationSchema } from './Users.data';
import { Theme, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  usePostPoductUserMutation,
  useUpdateUsersMutation,
} from '@/services/airSales/settings/users';
import { enqueueSnackbar } from 'notistack';
import { useGetCompanyAccountsRolesQuery } from '@/services/common-APIs';
import { getSession } from '@/utils';

const useUsers = (isAddUserDrawer?: any, setIsAddUserDrawer?: any) => {
  const [checkedUser, setCheckedUser] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const theme = useTheme<Theme>();
  const [postPoductUser] = usePostPoductUserMutation();
  const open = Boolean(anchorEl);
  const [updateUsers] = useUpdateUsersMutation();
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

  const defaultValues: any = {
    firstName: isAddUserDrawer?.data?.user?.firstName,
    lastName: isAddUserDrawer?.data?.user?.lastName,
    email: isAddUserDrawer?.data?.user?.email,
    address: '',
    phoneNumber: '',
    jobTitle: 'dev',
    role: isAddUserDrawer?.data?.role?.name,
    team: isAddUserDrawer?.data?.team?.name,
    language: '',
    timezone: '',
    faceBookUrl: '',
    linkedInUrl: '',
    twitterUrl: '',
  };

  const methods: any = useForm({
    resolver: yupResolver(userValidationSchema),
    defaultValues: defaultValues,
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

  const handleUpdateStatus = async (id: any, value: any) => {
    const statusVal = value?.target?.checked ? 'ACTIVE' : 'INACTIVE';
    try {
      await updateUsers({ id: id, body: { status: statusVal } })?.unwrap();
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
    methods,
    handleSubmit,
    onSubmit,
    checkedUser,
    setCheckedUser,
    rolesByCompanyId,
    handleUpdateStatus,
  };
};

export default useUsers;
