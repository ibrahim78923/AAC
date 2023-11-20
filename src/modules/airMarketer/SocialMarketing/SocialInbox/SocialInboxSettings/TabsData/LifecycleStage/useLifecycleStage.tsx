import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { Theme, useTheme } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  columns,
  socialSalesDefaultValues,
  socialSalesvalidationSchema,
} from './LifecycleStage.data';

const useLifecycleStage = () => {
  const [isDraweropen, setIsDraweropen] = useState('');

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productSearch, setproductSearch] = useState<string>('');
  const [isDisableButton, setDisableButton] = useState(false);

  const theme = useTheme<Theme>();

  const handleCloseDrawer = () => {
    setIsDraweropen('');
  };

  const dealPipelines = useForm({
    resolver: yupResolver(socialSalesvalidationSchema),
    defaultValues: socialSalesDefaultValues,
  });
  const { handleSubmit } = dealPipelines;
  const onSubmit = () => {};

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleDelete = () => {
    setDeleteModalOpen(false);
  };

  const getCheckbox = (event: any) => {
    setDisableButton(event?.target?.checked);
  };

  const getRowValues = columns(setIsDraweropen, setDeleteModalOpen);
  return {
    isDraweropen,
    getRowValues,
    setIsDraweropen,
    isDeleteModalOpen,
    setDeleteModalOpen,
    productSearch,
    setproductSearch,
    theme,
    handleCloseDrawer,
    dealPipelines,
    handleSubmit,
    onSubmit,
    handleCloseDeleteModal,
    handleDelete,
    getCheckbox,
    setDisableButton,
    isDisableButton,
  };
};

export default useLifecycleStage;
