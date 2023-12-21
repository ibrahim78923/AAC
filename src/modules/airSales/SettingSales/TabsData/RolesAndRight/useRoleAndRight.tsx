import React, { useState } from 'react';

import { Theme, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './RolesRight.data';
import { useRouter } from 'next/router';

const useRoleAndRight: any = () => {
  const theme = useTheme<Theme>();
  const navigate = useRouter();

  const [isDraweropen, setIsDraweropen] = useState({
    isToggle: false,
    type: '',
  });
  const [selectedValue, setSelectedValue] = useState(null);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [checkedRows, setCheckedRows] = useState();

  const handleChange = () => {
    setExpanded(!expanded);
  };

  const handleClose = () => {
    setSelectedValue(null);
  };

  const handleClick = (event: any) => {
    setSelectedValue(event?.currentTarget);
  };

  const handleCloseDrawer = () => {
    setIsDraweropen({ isToggle: false, type: '' });
  };

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
  });

  return {
    handleCloseDrawer,
    setIsDraweropen,
    setIsOpenDelete,
    setCheckedRows,
    selectedValue,
    isOpenDelete,
    handleChange,
    isDraweropen,
    setExpanded,
    handleClick,
    handleClose,
    checkedRows,
    expanded,
    navigate,
    methods,
    theme,
    open,
  };
};

export default useRoleAndRight;
