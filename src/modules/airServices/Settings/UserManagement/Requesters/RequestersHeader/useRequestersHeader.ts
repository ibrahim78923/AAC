import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { requestersDropdown } from '../Requesters.data';
import { useDeleteRequesterMutation } from '@/services/airServices/settings/user-management';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useRequestersHeader = (props: any) => {
  const { selectedRequestersList, setSelectedRequestersList } = props;
  const [searchValue, setSearchValue] = useState<string>('');
  const theme = useTheme();
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [warningModal, setWarningModal] = useState<boolean>(false);
  const [deleteRequester] = useDeleteRequesterMutation();

  const requestorsDropdownOptions = requestersDropdown(
    setDeleteModal,
    setWarningModal,
  );
  const deleteIds = selectedRequestersList?.map((list: any) => list?._id);
  const submitDeleteModal = async () => {
    try {
      await deleteRequester({ ids: deleteIds });
      successSnackbar('Delete Successfully');
      setSelectedRequestersList([]);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
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
    deleteModal,
    setDeleteModal,
    warningModal,
    setWarningModal,
    submitWarningModal,
    submitDeleteModal,
    requestorsDropdownOptions,
    router,
  };
};
