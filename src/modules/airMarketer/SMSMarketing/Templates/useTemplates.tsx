import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { Theme, useTheme } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  columns,
  TemplatesDefaultValues,
  TemplatesvalidationSchema,
} from './Templates.data';

const useTemplatese = () => {
  const [isDraweropen, setIsDraweropen] = useState(false);
  const [productSearch, setproductSearch] = useState<string>('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isModalHeading, setIsModalHeading] = useState('Create');

  const theme = useTheme<Theme>();

  const handleDeleteRecord = () => {
    setIsOpenAlert(true);
  };
  const deleteStageLifeCycle = async () => {};

  const handleCloseDrawer = () => {
    reset(TemplatesvalidationSchema);
    setIsDraweropen(false);
  };

  const Templates: any = useForm({
    resolver: yupResolver(TemplatesvalidationSchema),
    defaultValues: TemplatesDefaultValues,
  });

  const { handleSubmit, reset } = Templates;
  const onSubmit = async () => {};

  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };

  const getRowValues = columns(
    setIsDraweropen,
    setIsModalHeading,
    handleDeleteRecord,
  );

  return {
    isDraweropen,
    setIsDraweropen,
    productSearch,
    setproductSearch,
    theme,
    handleCloseDrawer,
    Templates,
    handleSubmit,
    onSubmit,
    getRowValues,
    isOpenAlert,
    handleCloseAlert,
    isModalHeading,
    setIsModalHeading,
    deleteStageLifeCycle,
    handleDeleteRecord,
  };
};

export default useTemplatese;
