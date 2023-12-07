import React, { useState } from 'react';

import { Theme, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './RolesRight.data';

const useRoleAndRight: any = () => {
  const [isDraweropen, setIsDraweropen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };
  const theme = useTheme<Theme>();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setIsEditOpen(true);
    setAnchorEl(null);
  };
  const handleCloseDrawer = () => {
    setIsDraweropen(false);
    setIsEditOpen(false);
  };

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
  });
  return {
    isDraweropen,
    setIsDraweropen,
    isOpenDelete,
    setIsOpenDelete,
    isEditOpen,
    setIsEditOpen,
    expanded,
    setExpanded,
    open,
    handleClick,
    handleCloseDrawer,
    methods,
    handleClose,
    handleChange,
    theme,
    anchorEl,
    setAnchorEl,
  };
};

export default useRoleAndRight;
