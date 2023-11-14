import React, { useState } from 'react';

import { Theme, useTheme } from '@mui/material';

import { useForm } from 'react-hook-form';

const useRestoreCompanies = () => {
  const [search, setSearch] = useState('');
  const [isDrawer, setIsDrawer] = useState(false);
  const [isRestoreDelete, setIsRestoreDelete] = useState(false);
  const [isRestoreItem, setIsRestoreItem] = useState(false);
  const theme = useTheme<Theme>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const methods: any = useForm({});

  const { handleSubmit } = methods;

  const onSubmit = async () => {};
  return {
    search,
    setSearch,
    isDrawer,
    setIsDrawer,
    theme,
    open,
    anchorEl,
    setAnchorEl,
    handleClick,
    handleClose,
    methods,
    handleSubmit,
    onSubmit,
    isRestoreDelete,
    setIsRestoreDelete,
    isRestoreItem,
    setIsRestoreItem,
  };
};

export default useRestoreCompanies;
