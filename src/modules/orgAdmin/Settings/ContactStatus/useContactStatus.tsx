import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { Theme, useTheme } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  columns,
  ContactStatusDefaultValues,
  ContactStatusvalidationSchema,
} from './ContactStatus.data';

const useContactStatus = () => {
  const [isDraweropen, setIsDraweropen] = useState(false);
  const [productSearch, setproductSearch] = useState<string>('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isModalHeading, setIsModalHeading] = useState('Create');

  const theme = useTheme<Theme>();

  const handleCloseDrawer = () => {
    setIsDraweropen(false);
  };

  const ContactStatus = useForm({
    resolver: yupResolver(ContactStatusvalidationSchema),
    defaultValues: ContactStatusDefaultValues,
  });
  const { handleSubmit } = ContactStatus;
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
    ContactStatus,
    handleSubmit,
    onSubmit,
    getRowValues,
    isOpenAlert,
    handleCloseAlert,
    isModalHeading,
    setIsModalHeading,
  };
};

export default useContactStatus;
