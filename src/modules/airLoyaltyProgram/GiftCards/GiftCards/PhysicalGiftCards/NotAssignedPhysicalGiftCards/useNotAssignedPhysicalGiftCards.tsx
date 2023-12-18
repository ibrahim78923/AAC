import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  data,
  notAssignedPhysicalGiftCardColumnsFunction,
} from './NotAssignedPhysicalGiftCards.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useNotAssignedPhysicalGiftCards = () => {
  const [notAssignedPhysicalGiftCardData, setNotAssignedPhysicalGiftCardData] =
    useState([]);
  const [search, setSearch] = useState('');
  const router = useRouter();
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

  const notAssignedPhysicalGiftCardColumns =
    notAssignedPhysicalGiftCardColumnsFunction(
      router,
      notAssignedPhysicalGiftCardData,
      setNotAssignedPhysicalGiftCardData,
      data,
    );

  return {
    router,
    notAssignedPhysicalGiftCardColumns,
    data,
    setSearch,
    search,
    handleClick,
    onSubmit,
    open,
    setOpen,
    handleClose,
  };
};
