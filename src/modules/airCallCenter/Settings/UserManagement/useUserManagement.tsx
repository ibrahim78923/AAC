import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import dayjs from 'dayjs';
// import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  addUserDefaultValues,
  addUserValidationSchema,
  viewUserValidationSchema,
} from './AddUser/AddUser.data';
import {
  addTeamsDefaultValues,
  addTeamsValidationSchema,
} from './AddTeams/AddTeams.data';
import { successSnackbar } from '@/utils/api';

const useUserManagement = () => {
  const [tabValue, setTabValue] = useState('users');
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };
  const [addTeamDrawer, setAddTeamDrawer] = useState(true);
  const [openDrawerAddUser, setOpenDrawerAddUser] = useState(false);
  const [openDrawerAddTeams, setOpenDrawerAddTeams] = useState(false);
  const [isViewed, setIsViewed] = useState(true);

  const methodsAddUser = useForm({
    resolver: yupResolver(
      !isViewed ? addUserValidationSchema : viewUserValidationSchema,
    ),
    defaultValues: addUserDefaultValues,
  });

  const { handleSubmit: handleMethodAddUser, reset: resetAddUserForm } =
    methodsAddUser;

  const methodsAddTeams = useForm({
    resolver: yupResolver(addTeamsValidationSchema),
    defaultValues: addTeamsDefaultValues,
  });

  const { handleSubmit: handleMethodsAddTeams, reset: resetAddTeamsForm } =
    methodsAddTeams;

  const handleOpenDrawerAddTeams = () => {
    setAddTeamDrawer(true);
    setOpenDrawerAddTeams(true);
  };
  const handleCloseDrawerAddTeams = () => {
    setOpenDrawerAddTeams(false);
    resetAddTeamsForm();
  };

  const handleOpenDrawerAddUser = () => {
    setIsViewed?.(false);
    setOpenDrawerAddUser(true);
  };
  const handleCloseDrawerAddUser = () => {
    setOpenDrawerAddUser(false);
    resetAddUserForm();
  };

  const onSubmitAddUser = async () => {
    successSnackbar('User added successfully');
    handleCloseDrawerAddUser();
  };
  const onSubmitAddTeams = async () => {
    successSnackbar('Team added successfully');
    handleCloseDrawerAddTeams();
  };
  const handleAddUserSubmit = handleMethodAddUser(onSubmitAddUser);
  const handleAddTeamsSubmits = handleMethodsAddTeams(onSubmitAddTeams);

  return {
    tabValue,
    handleChangeTab,
    openDrawerAddUser,
    methodsAddUser,
    handleOpenDrawerAddUser,
    handleCloseDrawerAddUser,
    handleAddUserSubmit,
    handleAddTeamsSubmits,
    handleOpenDrawerAddTeams,
    handleCloseDrawerAddTeams,
    methodsAddTeams,
    openDrawerAddTeams,
    addTeamDrawer,
    setAddTeamDrawer,
    setOpenDrawerAddTeams,
    isViewed,
    setIsViewed,
    setOpenDrawerAddUser,
  };
};

export default useUserManagement;
