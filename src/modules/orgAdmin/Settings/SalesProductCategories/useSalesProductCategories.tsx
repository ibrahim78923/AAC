import React, { useState } from 'react';

import { useForm } from 'react-hook-form';

import { Theme, useTheme } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  columns,
  ProductCategoryDefaultValues,
  ProductCategoryvalidationSchema,
} from './SalesProductCategories.data';

const useSalesProductCategories = () => {
  const [isDraweropen, setIsDraweropen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [productSearch, setproductSearch] = useState<string>('');
  const [isChecked, setIsChecked] = useState(false);
  const [isGetRowValues, setIsGetRowValues] = useState('');
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

  const ProductCategory = useForm({
    resolver: yupResolver(ProductCategoryvalidationSchema),
    defaultValues: ProductCategoryDefaultValues,
  });
  const { handleSubmit } = ProductCategory;
  const onSubmit = () => {};

  const getRowValues = columns(
    setIsGetRowValues,
    setIsChecked,
    isChecked,
    isGetRowValues,
  );

  return {
    isDraweropen,
    setIsDraweropen,
    isEditMode,
    setIsEditMode,
    productSearch,
    setproductSearch,
    theme,
    anchorEl,
    open,
    handleClick,
    handleClose,
    handleCloseDrawer,
    ProductCategory,
    handleSubmit,
    onSubmit,
    isChecked,
    setIsChecked,
    isGetRowValues,
    setIsGetRowValues,
    getRowValues,
  };
};

export default useSalesProductCategories;
