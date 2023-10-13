import React, { useState } from 'react';

import { useForm } from 'react-hook-form';

import { Theme, useTheme } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import { v4 as uuidv4 } from 'uuid';

import {
  dataArray,
  dealPipelinesDefaultValues,
  dealPipelinesvalidationSchema,
} from './DealPipelines.data';

import { RHFTextField } from '@/components/ReactHookForm';

const useDealPipelines = () => {
  const [isDraweropen, setIsDraweropen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productSearch, setproductSearch] = useState<string>('');
  const [isDisableButton, setDisableButton] = useState(false);
  const [dynamicFields, setDynamicFields] = useState([...dataArray]);

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

  const dealPipelines = useForm({
    resolver: yupResolver(dealPipelinesvalidationSchema),
    defaultValues: dealPipelinesDefaultValues,
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
    setDisableButton(event.target.checked);
  };

  const addField = () => {
    setDynamicFields((prevFields) => [
      ...prevFields,
      {
        componentProps: {
          name: `dynamicField${uuidv4()}_1`,
          label: 'Dynamic Field',
          fullWidth: true,
        },
        component: RHFTextField,
        md: 5,
      },
      {
        componentProps: {
          name: `dynamicField${uuidv4()}_2`,
          label: 'Dynamic Field',
          fullWidth: true,
        },
        component: RHFTextField,
        md: 5,
      },
    ]);
  };
  const deleteField = (index: any) => {
    setDynamicFields((prevFields) => [
      ...prevFields.slice(0, index),
      ...prevFields.slice(index + 2),
    ]);
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
    dealPipelines,
    handleSubmit,
    onSubmit,
    handleCloseDeleteModal,
    handleDelete,
    getCheckbox,
    setDisableButton,
    isDisableButton,
    dynamicFields,
    addField,
    deleteField,
  };
};

export default useDealPipelines;
