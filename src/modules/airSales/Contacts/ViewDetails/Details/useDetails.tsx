import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useTheme } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import { detailsDefaultValues, detailsValidationSchema } from './Details.data';

const useDetails = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleShowMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const methodsDetails = useForm({
    resolver: yupResolver(detailsValidationSchema),
    defaultValues: detailsDefaultValues,
  });

  const onSubmit = () => {};
  const { handleSubmit } = methodsDetails;
  return {
    theme,
    methodsDetails,
    onSubmit,
    handleSubmit,
    handleShowMenuClick,
    anchorEl,
    handleClose,
    open,
  };
};

export default useDetails;
