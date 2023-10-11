import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { Theme, useTheme } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  salesProductDefaultValues,
  salesProductvalidationSchema,
} from './SalesProduct.data';

const useSalesProduct = () => {
  const [isDraweropen, setIsDraweropen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productSearch, setproductSearch] = useState<string>('');
  const theme = useTheme<Theme>();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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

  const salesProduct = useForm({
    resolver: yupResolver(salesProductvalidationSchema),
    defaultValues: salesProductDefaultValues,
  });
  const { handleSubmit } = salesProduct;
  const onSubmit = () => {};

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleDelete = () => {
    setDeleteModalOpen(false);
  };

  return {
    isDraweropen,
    setIsDraweropen,
    isEditMode,
    setIsEditMode,
    isDeleteModalOpen,
    setDeleteModalOpen,
    productSearch,
    setproductSearch,
    theme,
    anchorEl,
    open,
    handleClick,
    handleClose,
    handleCloseDrawer,
    salesProduct,
    handleSubmit,
    onSubmit,
    handleCloseDeleteModal,
    handleDelete,
  };
};

export default useSalesProduct;
