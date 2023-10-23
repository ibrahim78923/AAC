import React, { useState } from 'react';

import { useForm } from 'react-hook-form';

import { Theme, useTheme } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  columns,
  LifeCycleStageDefaultValues,
  LifeCycleStagevalidationSchema,
} from './LifeCycleStage.data';

const useLifeCycleStage = () => {
  const [isDraweropen, setIsDraweropen] = useState(false);
  const [productSearch, setproductSearch] = useState<string>('');
  const [isChecked, setIsChecked] = useState(false);
  const [isGetRowValues, setIsGetRowValues] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isModalHeading, setIsModalHeading] = useState('Create');

  const theme = useTheme<Theme>();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseDrawer = () => {
    setIsDraweropen(false);
  };

  const LifeCycleStage = useForm({
    resolver: yupResolver(LifeCycleStagevalidationSchema),
    defaultValues: LifeCycleStageDefaultValues,
  });
  const { handleSubmit } = LifeCycleStage;
  const onSubmit = () => {};

  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };

  const getRowValues = columns(
    setIsGetRowValues,
    setIsChecked,
    isChecked,
    isGetRowValues,
    setIsDraweropen,
    setIsOpenAlert,
    setIsModalHeading,
  );

  return {
    isDraweropen,
    setIsDraweropen,
    productSearch,
    setproductSearch,
    theme,
    anchorEl,
    open,
    handleClick,
    handleClose,
    handleCloseDrawer,
    LifeCycleStage,
    handleSubmit,
    onSubmit,
    isChecked,
    setIsChecked,
    isGetRowValues,
    setIsGetRowValues,
    getRowValues,
    isOpenAlert,
    setIsOpenAlert,
    handleCloseAlert,
    isModalHeading,
    setIsModalHeading,
  };
};

export default useLifeCycleStage;
