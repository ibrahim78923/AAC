import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  data,
  assignedPhysicalGiftCardColumnsFunction,
} from './AssignedPhysicalGiftCards.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useAssignedPhysicalGiftCards = () => {
  const [assignedPhysicalGiftCardData, setAssignedPhysicalGiftCardData] =
    useState([]);
  const [search, setSearch] = useState('');
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDrawerOpen, setIsADrawerOpen] = useState();
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

  const assignedPhysicalGiftCardColumns =
    assignedPhysicalGiftCardColumnsFunction(
      router,
      assignedPhysicalGiftCardData,
      setAssignedPhysicalGiftCardData,
      data,
    );

  return {
    router,
    assignedPhysicalGiftCardColumns,
    data,
    search,
    setSearch,
    handleClick,
    onSubmit,
    open,
    setOpen,
    handleClose,
    isDrawerOpen,
    setIsADrawerOpen,
  };
};
