import React, { useEffect, useState } from 'react';

import { Theme, useTheme } from '@mui/material';

import {
  useDeleteFoldersMutation,
  useGetDocumentFolderQuery,
  usePostDocumentFolderMutation,
  useUpdateFolderMutation,
} from '@/services/commonFeatures/documents';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useAuth from '@/hooks/useAuth';

import { enqueueSnackbar } from 'notistack';
import { validationSchema } from './Documents.data';
import { isNullOrEmpty } from '@/utils';

const useDocuments: any = () => {
  const theme = useTheme<Theme>();
  const [value, setValue] = useState('Search here');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isOpenFolderDrawer, setIsOpenFolderDrawer] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEditOpenModal, setIsEditOpenModal] = useState();
  const [modalHeading, setModalHeading] = useState('Create New Folder');
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [postDocumentFolder] = usePostDocumentFolderMutation();
  const [updateFolder] = useUpdateFolderMutation();
  const [deleteFolders] = useDeleteFoldersMutation();
  const [checkboxChecked, setCheckboxChecked] = useState<string[]>([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const { user }: any = useAuth();
  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetDocumentFolderQuery({ organizationId: user?.organization?._id });

  const deleteUserFolders = async () => {
    try {
      await deleteFolders({
        ids: checkboxChecked?.map((id) => `ids=${id}`)?.join('&'),
      }).unwrap();
      enqueueSnackbar('Company Deleted Successfully', {
        variant: 'success',
      });
      setIsOpenDelete(false);
    } catch (error: any) {
      enqueueSnackbar('Something went wrong!', { variant: 'error' });
    }
  };

  const MoveToFolder = async () => {
    try {
      for (const item of checkboxChecked) {
        await updateFolder({
          id: item,
          body: {
            parentFolderId: selectedItemId,
            name: data?.data?.folders.find((item2: any) => item2?._id == item)
              .name,
          },
        }).unwrap();
      }
      enqueueSnackbar('Folder Moved Successfully', {
        variant: 'success',
      });
      setIsOpenFolderDrawer(false);
    } catch (error: any) {
      enqueueSnackbar('Something went wrong!', { variant: 'error' });
    }
  };

  const handleCheckboxChange = (id: string) => {
    if (checkboxChecked?.includes(id)) {
      setCheckboxChecked(checkboxChecked?.filter((item: string) => item != id));
    } else {
      setCheckboxChecked([...checkboxChecked, id]);
    }
  };

  const handleBoxClick = (itemId: any) => {
    setSelectedItemId(itemId === selectedItemId ? null : itemId);
  };

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const FolderAdd: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: async () => {
      if (isEditOpenModal) {
        if (!isNullOrEmpty(Object?.keys(isEditOpenModal))) {
          return {
            name: watch('name'),
          };
        }
      }
      return validationSchema;
    },
  });

  useEffect(() => {
    if (isEditOpenModal) {
      const { name } = isEditOpenModal;
      FolderAdd?.setValue('name', name);
    }
  }, [isEditOpenModal, FolderAdd]);

  const { handleSubmit, watch, reset } = FolderAdd;

  const onSubmit = async () => {
    const documentData = {
      name: watch('name'),
    };
    try {
      if (isEditOpenModal) {
        await updateFolder({
          id: checkboxChecked,
          body: documentData,
        }).unwrap();
        enqueueSnackbar('Folder Update Successfully', {
          variant: 'success',
        });
      } else {
        await postDocumentFolder({
          body: documentData,
        }).unwrap();
        enqueueSnackbar('Folder Created Successfully', {
          variant: 'success',
        });
        reset(validationSchema);
        setIsOpenModal(false);
      }
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
  };

  return {
    documentData: data?.data?.folders,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    open,
    handleClick,
    handleClose,
    value,
    setValue,
    isOpenDrawer,
    setIsOpenDrawer,
    isOpenModal,
    setIsOpenModal,
    theme,
    isOpenFolderDrawer,
    setIsOpenFolderDrawer,
    isEditOpenModal,
    setIsEditOpenModal,
    isOpenDelete,
    setIsOpenDelete,
    anchorEl,
    setAnchorEl,
    handleSubmit,
    onSubmit,
    FolderAdd,
    handleCheckboxChange,
    checkboxChecked,
    modalHeading,
    setModalHeading,
    deleteUserFolders,
    selectedItemId,
    setSelectedItemId,
    handleBoxClick,
    MoveToFolder,
  };
};

export default useDocuments;
