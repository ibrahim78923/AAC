import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import dayjs from 'dayjs';
// import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  addUserDefaultValues,
  addUserValidationSchema,
} from './AddUser/AddUser.data';

const useUserManagement = () => {
  const [tabValue, setTabValue] = useState('users');
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const [openDrawerAddUser, setOpenDrawerAddUser] = useState(false);
  const methodsAddUser = useForm({
    resolver: yupResolver(addUserValidationSchema),
    defaultValues: addUserDefaultValues,
  });

  const { handleSubmit: handleMethodAddUser, reset: resetAddUserForm } =
    methodsAddUser;

  const handleOpenDrawerAddUser = () => {
    setOpenDrawerAddUser(true);
  };
  const handleCloseDrawerAddUser = () => {
    setOpenDrawerAddUser(false);
    resetAddUserForm();
  };

  const onSubmitAddUser = async () => {
    // try {
    //   await postAddFaq({ body: values })?.unwrap();
    //   handleCloseModalFaq();
    //   enqueueSnackbar('FAQ added successfully', {
    //     variant: 'success',
    //   });
    // } catch (error: any) {
    //   enqueueSnackbar('An error occured', {
    //     variant: 'error',
    //   });
    // }
  };
  const handleAddUserSubmit = handleMethodAddUser(onSubmitAddUser);

  return {
    tabValue,
    handleChangeTab,
    openDrawerAddUser,
    methodsAddUser,
    handleOpenDrawerAddUser,
    handleCloseDrawerAddUser,
    handleAddUserSubmit,
  };
};

export default useUserManagement;
