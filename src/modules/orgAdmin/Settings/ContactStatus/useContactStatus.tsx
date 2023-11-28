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

const useContactStatus = () => {
  const [isDraweropen, setIsDraweropen] = useState(false);
  const [productSearch, setproductSearch] = useState<string>('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [rowId, setRowId] = useState<string>('');
  const [editData, setEditData] = useState<any>({});
  const [isModalHeading, setIsModalHeading] = useState('Create');
  const [postContactStatus] = usePostContactStatusMutation();
  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetContactStatusQuery([]);
  const [deleteContactStatus] = useDeleteContactStatusMutation();
  const [updateContactStatus] = useUpdateContactStatusMutation();

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
    } catch (error: any) {
      enqueueSnackbar('Something went wrong!', { variant: 'error' });
    }
  };

  const handleCloseDrawer = () => {
    reset(ContactStatusvalidationSchema);
    setEditData({});
    setIsDraweropen(false);
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
  useEffect(() => {
    if (editData) {
      const { name, description } = editData;
      ContactStatus.setValue('name', name);
      ContactStatus.setValue('description', description);
    }
  }, [editData, ContactStatus]);
  const { handleSubmit, reset } = ContactStatus;
  const onSubmit = async (data: any) => {
    const settingContactStatus = {
      ...data,
    };
    try {
      if (editData) {
        await updateContactStatus({
          body: settingContactStatus,
          id: editData?._id,
        }).unwrap();

        setIsDraweropen(false);
        enqueueSnackbar('Status Updated Successfully', {
          variant: 'success',
        });
      } else {
        await postContactStatus({
          body: settingContactStatus,
        }).unwrap();
        enqueueSnackbar('Status Added Successfully', {
          variant: 'success',
        });
        reset(ContactStatusvalidationSchema);
        setIsDraweropen(false);
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
    tableRow: data?.data?.conatactStatus,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    isDraweropen,
    setIsDraweropen,
    productSearch,
    setproductSearch,
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
  };
};

export default useContactStatus;
