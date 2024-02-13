import React, { useState } from 'react';
import { columnsUser, defaultValues, validationSchema } from './UserTable.data';
import { Theme, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const useUserTable = ({ initialValueProps = defaultValues }: any) => {
  const [team, setTeam] = React.useState('Alfa');
  const [role, setRole] = React.useState('AccountAdmin');

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const theme = useTheme<Theme>();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setIsEditOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsEditOpen(false);
  };

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValueProps,
  });

  const handleTeam = (event: any) => {
    setTeam(event?.target?.value);
  };
  const handleRole = (event: any) => {
    setRole(event?.target?.value);
  };

  const getRowValues: any = columnsUser(handleTeam, handleRole, team, role);
  return {
    team,
    setTeam,
    handleTeam,
    role,
    setRole,
    handleRole,
    getRowValues,
    isOpenDelete,
    setIsOpenDelete,
    anchorEl,
    setAnchorEl,
    open,
    theme,
    handleClick,
    handleClose,
    methods,
    handleCloseDrawer,
    isEditOpen,
    setIsEditOpen,
  };
};

export default useUserTable;
