import React, { useEffect, useState } from 'react';

import { Theme, useTheme } from '@mui/material';
import {
  useGetDocumentFolderQuery,
  usePostDocumentFolderMutation,
  useUpdateFolderMutation,
} from '@/services/commonFeatures/documents';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { validationSchema } from './Folder.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { isNullOrEmpty } from '@/utils';
import { enqueueSnackbar } from 'notistack';

const useFolder: any = () => {
  const theme = useTheme<Theme>();
  const [value, setValue] = useState('search here');
  const [modalHeading, setModalHeading] = useState('Create New Folder');
  const [isEditOpenModal, setIsEditOpenModal] = useState();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isOpenFolderDrawer, setIsOpenFolderDrawer] = useState(false);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElSide, setAnchorElSide] = useState<null | HTMLElement>(null);
  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const [isCreateLinkOpen, setIsCreateLinkOpen] = useState(false);
  const open = Boolean(anchorEl);
  const [postDocumentFolder] = usePostDocumentFolderMutation();
  const [updateFolder] = useUpdateFolderMutation();
  const openSide = Boolean(anchorElSide);

  const searchParams = useSearchParams();

  const parentFolderId = searchParams.get('folder');
  const parentFolderName = searchParams.get('name');

  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetDocumentFolderQuery({ parentFolderId });

  const handlePdfOpen = () => setIsPdfOpen(true);
  const handlePdfClose = () => setIsPdfOpen(false);

  const FolderAdd: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: async () => {
      if (isEditOpenModal) {
        if (!isNullOrEmpty(Object.keys(isEditOpenModal))) {
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
      FolderAdd.setValue('name', name);
    }
  }, [isEditOpenModal, FolderAdd]);

  const { handleSubmit, watch, reset } = FolderAdd;

  const onSubmit = async () => {
    const documentData = {
      parentFolderId: parentFolderId,
      name: watch('name'),
    };
    try {
      if (isEditOpenModal) {
        await updateFolder({
          id: parentFolderId,
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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickSide = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElSide(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseSide = () => {
    setAnchorElSide(null);
  };

  return {
    documentSubData: data?.data,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    open,
    openSide,
    handleCloseSide,
    handleClick,
    handleClickSide,
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
    anchorElSide,
    setAnchorElSide,
    isLinkOpen,
    setIsLinkOpen,
    isCreateLinkOpen,
    setIsCreateLinkOpen,
    isPdfOpen,
    setIsPdfOpen,
    handlePdfOpen,
    handlePdfClose,
    parentFolderId,
    parentFolderName,
    modalHeading,
    setModalHeading,
    onSubmit,
    handleSubmit,
    FolderAdd,
  };
};

export default useFolder;
