import { useTheme } from '@mui/material';
import { useState } from 'react';
import { requestorsList, requestorsDropdown } from './Requestors.data';
import { useRouter } from 'next/router';

export const useRequestors = () => {
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

  return {
    theme,
    isDrawerOpen,
    setIsDrawerOpen,
    selectedRequestorsList,
    setSelectedRequestorsList,
    deleteModal,
    setDeleteModal,
    warningModal,
    setWarningModal,
    requestorsDropdownOptions,
    router,
    requestorsListColumn,
  };
};
