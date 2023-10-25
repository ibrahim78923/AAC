import { useState } from 'react';

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
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isModalHeading, setIsModalHeading] = useState('Create');

  const theme = useTheme<Theme>();

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
    handleCloseDrawer,
    LifeCycleStage,
    handleSubmit,
    onSubmit,
    getRowValues,
    isOpenAlert,
    handleCloseAlert,
    isModalHeading,
    setIsModalHeading,
  };
};

export default useLifeCycleStage;
