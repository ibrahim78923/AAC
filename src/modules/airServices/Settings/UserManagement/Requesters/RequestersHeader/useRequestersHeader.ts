import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { requestorsDropdown, requestorsList } from '../Requestors.data';

export const useRequestersHeader = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const theme = useTheme();
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedRequestorsList, setSelectedRequestorsList] = useState<any>([]);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [warningModal, setWarningModal] = useState<boolean>(false);
  const requestorsListColumn = requestorsList(
    selectedRequestorsList,
    setSelectedRequestorsList,
    theme,
    router,
  );
  const requestorsDropdownOptions = requestorsDropdown(
    setDeleteModal,
    setWarningModal,
  );
  const submitDeleteModal = () => {
    enqueueSnackbar('Delete Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    setDeleteModal(false);
  };
  const submitWarningModal = () => {
    enqueueSnackbar('Warning', {
      variant: NOTISTACK_VARIANTS?.WARNING,
    });
    setWarningModal(false);
  };

  return {
    searchValue,
    setSearchValue,
    theme,
    isDrawerOpen,
    setIsDrawerOpen,
    selectedRequestorsList,
    setSelectedRequestorsList,
    deleteModal,
    setDeleteModal,
    warningModal,
    setWarningModal,
    submitWarningModal,
    submitDeleteModal,
    requestorsDropdownOptions,
    router,
    requestorsListColumn,
  };
};
