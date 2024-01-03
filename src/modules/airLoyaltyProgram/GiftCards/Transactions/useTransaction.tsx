import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useTransaction = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    setOpen(false);
    enqueueSnackbar('File Exported Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };

  return {
    theme,
    router,
    search,
    setSearch,
    handleClick,
    onSubmit,
    open,
    setOpen,
    handleClose,
  };
};
