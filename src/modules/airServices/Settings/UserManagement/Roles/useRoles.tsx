import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  upsertRolesDefaultValues,
  upsertRolesValidationSchema,
} from './Roles.data';
import { useTheme } from '@mui/material';
import { useState } from 'react';
import { NOTISTACK_VARIANTS, SETTINGS_ADD_ROLE } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';
export const useRoles = () => {
  const theme = useTheme();
  const [checkboxState, setCheckboxState] = useState({});
  const router = useRouter();
  const [rolesMenu, setRolesMenu] = useState<null | HTMLElement>(null);
  const [isRoleDeleteModalOpen, setIsRoleDeleteModalOpen] = useState(false);
  const [roleEdit, setRoleEdit] = useState(false);

  const roleCloseHandler = () => {
    setIsRoleDeleteModalOpen(false);
  };
  const roleDeleteHandler = () => {
    setIsRoleDeleteModalOpen(true);
  };

  const openRolesMenu = Boolean(rolesMenu);

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setRolesMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setRolesMenu(null);
  };
  const rolesMethods: any = useForm({
    resolver: yupResolver(upsertRolesValidationSchema),
    defaultValues: upsertRolesDefaultValues,
  });
  const addNewRole = () => {
    router?.push(AIR_SERVICES?.USER_ADD_NEW_ROLES_SETTINGS);
  };
  const backToRoles = () => {
    router?.push(AIR_SERVICES?.USER_ROLES_SETTINGS);
  };
  const { handleSubmit, reset } = rolesMethods;

  const onSubmit = async () => {
    enqueueSnackbar('Role Add Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    reset(upsertRolesDefaultValues);
    backToRoles();
  };
  const roleEditClickHandler = () => {
    setRoleEdit(true);
    addNewRole();
  };
  const handleMenuOptionClick = (option: string) => {
    handleCloseMenu();
    if (option === SETTINGS_ADD_ROLE.EDIT) {
      roleEditClickHandler();
    } else if (option === SETTINGS_ADD_ROLE.DELETE) {
      roleDeleteHandler();
    }
  };

  return {
    addNewRole,
    rolesMethods,
    theme,
    backToRoles,
    onSubmit,
    handleSubmit,
    checkboxState,
    setCheckboxState,
    handleClickMenu,
    openRolesMenu,
    handleCloseMenu,
    rolesMenu,
    isRoleDeleteModalOpen,
    roleCloseHandler,
    roleDeleteHandler,
    roleEditClickHandler,
    roleEdit,
    handleMenuOptionClick,
  };
};
