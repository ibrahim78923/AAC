import React, { useState } from 'react';

import { Theme, useTheme } from '@mui/material';
import {
  useGetDocumentFolderQuery,
  usePostDocumentFolderMutation,
} from '@/services/commonFeatures/documents';
import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { defaultValuesFolder, validationSchema } from './Documents.data';

const useDocuments = () => {
  const theme = useTheme<Theme>();
  const [value, setValue] = useState('search here');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isOpenFolderDrawer, setIsOpenFolderDrawer] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEditOpenModal, setIsEditOpenModal] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [postDocumentFolder] = usePostDocumentFolderMutation();
  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetDocumentFolderQuery([]);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const FolderAdd: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValuesFolder,
  });

  const { handleSubmit, watch, reset } = FolderAdd;

  const onSubmit = async () => {
    const documentData = {
      name: watch('name'),
    };
    try {
      await postDocumentFolder({
        body: documentData,
      }).unwrap();
      enqueueSnackbar('Folder Created Successfully', {
        variant: 'success',
      });
      reset(validationSchema);
      setIsOpenModal(false);
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
  };

  return {
    data: data?.folders,
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
  };
};

export default useDocuments;
