import { NOTISTACK_VARIANTS, ROLES } from '@/constants/strings';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { requestersDropdown } from '../Requesters.data';
import {
  useDeleteRequesterMutation,
  usePostAddRequesterMutation,
} from '@/services/airServices/settings/user-management';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  upsertRequestersDefaultValues,
  upsertRequestersValidationSchema,
} from '../UpsertRequesters/UpsertRequesters.data';
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
    const response: any = await deleteRequester({
      ids: deleteIds,
    });
    try {
      response;
      enqueueSnackbar(response?.data?.message && 'Delete Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setSelectedRequestersList([]);
    } catch (err: any) {
      enqueueSnackbar(!response?.data?.message && `Error Occurs`, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const submitWarningModal = () => {
    enqueueSnackbar('Warning', {
      variant: NOTISTACK_VARIANTS?.WARNING,
    });
    setWarningModal(false);
  };

  const methods: any = useForm({
    resolver: yupResolver(upsertRequestersValidationSchema),
    defaultValues: upsertRequestersDefaultValues(null),
  });
  const { handleSubmit, reset } = methods;

  const [addRequester, { isLoading }] = usePostAddRequesterMutation();

  const submit = async (data: any) => {
    try {
      const payload = {
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: data?.email,
        role: data?.role,
        jobTitle: data?.jobTitle,
        phoneNumber: data?.phoneNumber,
        timezone: data?.timezone,
      };
      await addRequester({ ...payload, role: ROLES?.ORG_REQUESTER }).unwrap();
      successSnackbar(' Requesters Added Successfully');
      handleClose?.();
    } catch (error: any) {
      errorSnackbar();
    }
  };
  const handleClose = () => {
    setIsDrawerOpen(false);
    reset?.();
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
    methods,
    handleSubmit,
    submit,
    handleClose,
    isLoading,
  };
};
