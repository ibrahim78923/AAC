// import { useRef } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useTheme } from '@mui/material';
import { createNewEmailSchema, defaultValues } from './CreateNewEmail.data';
import { useState } from 'react';

export const useCreateNewEmail = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isBcc, setIsBcc] = useState<string[]>(['both']);
  const [isAddNoteDrawer, setIsAddNoteDrawer] = useState<boolean>(false);
  const [isActive, setIsActive] = useState({
    bcc: false,
    cc: false,
  });

  const theme = useTheme();
  const methods = useForm({
    resolver: yupResolver(createNewEmailSchema),
    defaultValues,
  });
  const { handleSubmit } = methods;

  const handleAddNoteDrawer = () => {
    setIsAddNoteDrawer(!isAddNoteDrawer);
  };

  const onSubmit = () => {};

  return {
    methods,
    defaultValues,
    enqueueSnackbar,
    handleSubmit,
    theme,
    onSubmit,
    isBcc,
    setIsBcc,
    isActive,
    setIsActive,
    handleAddNoteDrawer,
    isAddNoteDrawer,
  };
};
