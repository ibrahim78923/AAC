import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { data, digitalGiftCardColumnsFunction } from './DigitalGiftCards.data';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useDigitalGiftCards = (setShowButtons: any) => {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [addDigitalCard, setAddDigitalCard] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileExportSubmit = (type: any) => {
    if (!!!type) {
      setOpen(false);
      return;
    }
    setOpen(false);
    enqueueSnackbar('File Exported Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
  };

  useEffect(() => {
    setShowButtons(false);
  }, []);

  const digitalGiftCardColumns = digitalGiftCardColumnsFunction(router);

  return {
    theme,
    router,
    digitalGiftCardColumns,
    data,
    search,
    setSearch,
    handleFileExportSubmit,
    open,
    setOpen,
    handleClose,
    openFilter,
    setOpenFilter,
    addDigitalCard,
    setAddDigitalCard,
  };
};
