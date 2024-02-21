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
  const [assignedTo, setAssignedTo] = useState(false);

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

  const notAssignedPhysicalGiftCardColumns =
    notAssignedPhysicalGiftCardColumnsFunction(
      router,
      notAssignedPhysicalGiftCardData,
      setNotAssignedPhysicalGiftCardData,
      data,
      setAssignedTo,
    );

  return {
    router,
    notAssignedPhysicalGiftCardColumns,
    data,
    setSearch,
    search,
    handleFileExportSubmit,
    open,
    setOpen,
    handleClose,
    assignedTo,
    setAssignedTo,
  };
};
