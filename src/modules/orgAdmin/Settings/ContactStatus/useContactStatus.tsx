import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { Theme, useTheme } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  columns,
  ContactStatusDefaultValues,
  ContactStatusvalidationSchema,
} from './ContactStatus.data';
import {
  useDeleteContactStatusMutation,
  useGetContactStatusQuery,
  usePostContactStatusMutation,
  useUpdateContactStatusMutation,
} from '@/services/orgAdmin/settings/contact-status';
import { enqueueSnackbar } from 'notistack';
import { isNullOrEmpty } from '@/utils';
import { PAGINATION } from '@/config';

const useContactStatus = () => {
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [isDraweropen, setIsDraweropen] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [rowId, setRowId] = useState<string>('');
  const [editData, setEditData] = useState<any>({});
  const [isModalHeading, setIsModalHeading] = useState('Create');
  const [postContactStatus, { isLoading: loadingAddStatus }] =
    usePostContactStatusMutation();

  // GET CONTACT STATUS LIST
  const paginationParams = {
    page: page,
    limit: pageLimit,
  };
  const [searchValue, setSearchValue] = useState(null);
  let searchPayLoad;
  if (searchValue) {
    searchPayLoad = { search: searchValue };
  }
  const {
    data,
    refetch: refetchContactStatus,
    isLoading: loadingList,
    isError,
    isFetching,
    isSuccess,
  } = useGetContactStatusQuery({ ...searchPayLoad, ...paginationParams });

  const [deleteContactStatus, { isLoading: loadingDelete }] =
    useDeleteContactStatusMutation();
  const [updateContactStatus, { isLoading: loadingUpdateContactStatus }] =
    useUpdateContactStatusMutation();

  const theme = useTheme<Theme>();

  const handleEditClick = (id: any) => {
    setIsModalHeading('Edit');
    setIsDraweropen(true);
    setEditData(id);
  };

  const handleDeleteRecord = (id: string) => {
    setRowId(id);
    setIsOpenAlert(true);
  };
  const deleteContactsStatus = async () => {
    try {
      await deleteContactStatus({
        id: rowId,
      }).unwrap();

      enqueueSnackbar('Status Deleted Successfully', {
        variant: 'success',
      });
      setIsOpenAlert(false);
      refetchContactStatus();
    } catch (error: any) {
      enqueueSnackbar('Something went wrong!', { variant: 'error' });
    }
  };

  const ContactStatus: any = useForm({
    resolver: yupResolver(ContactStatusvalidationSchema),
    defaultValues: async () => {
      if (editData) {
        const { name, description } = editData;
        if (!isNullOrEmpty(Object.keys(editData))) {
          return {
            name,
            description,
          };
        }
      }
      return ContactStatusDefaultValues;
    },
  });
  const { handleSubmit, reset } = ContactStatus;

  const handleCloseDrawer = () => {
    setIsDraweropen(false);
    setEditData({});
    reset();
  };
  useEffect(() => {
    if (editData) {
      const { name, description } = editData;
      ContactStatus.setValue('name', name);
      ContactStatus.setValue('description', description);
    }
  }, [editData, ContactStatus]);

  const onSubmit = async (data: any) => {
    const settingContactStatus = {
      ...data,
    };
    try {
      if (Object?.keys(editData)[0]) {
        await updateContactStatus({
          body: settingContactStatus,
          id: editData?._id,
        }).unwrap();
        handleCloseDrawer();
        refetchContactStatus();
        enqueueSnackbar('Status Updated Successfully', {
          variant: 'success',
        });
      } else {
        await postContactStatus({
          body: settingContactStatus,
        }).unwrap();
        handleCloseDrawer();
        refetchContactStatus();
        enqueueSnackbar('Status Added Successfully', {
          variant: 'success',
        });
      }
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
  };

  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };

  const getRowValues = columns(
    handleDeleteRecord,
    setIsModalHeading,
    handleEditClick,
  );

  return {
    setPageLimit,
    setPage,
    setSearchValue,
    tableRow: data?.data,
    loadingList,
    isError,
    isFetching,
    isSuccess,
    isDraweropen,
    setIsDraweropen,
    theme,
    handleCloseDrawer,
    ContactStatus,
    handleSubmit,
    onSubmit,
    getRowValues,
    isOpenAlert,
    handleCloseAlert,
    isModalHeading,
    setIsModalHeading,
    deleteContactsStatus,
    loadingDelete,
    loadingUpdateContactStatus,
    loadingAddStatus,
  };
};

export default useContactStatus;
