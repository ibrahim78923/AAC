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
  const [isDrawerOpen, setIsADrawerOpen] = useState(false);

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
    open,
    setOpen,
    handleClose,
    isDrawerOpen,
    setIsADrawerOpen,
    handleFileExportSubmit,
  };
};
