import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { keypadDefaultValue, keypadSchema } from './Keypad.data';
import { successSnackbar } from '@/utils/api';

export const useKeypad = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'Keypad-Trigger-popover' : undefined;
  const method = useForm({
    resolver: yupResolver(keypadSchema),
    defaultValues: keypadDefaultValue,
  });
  const { setValue, watch } = method;
  const phoneNo = watch('phoneNo');

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSubmit = async () => {
    successSnackbar('Called successfully');
  };

  return {
    anchorEl,
    open,
    id,
    method,
    phoneNo,
    handleClick,
    handleClose,
    onSubmit,
    setValue,
  };
};
