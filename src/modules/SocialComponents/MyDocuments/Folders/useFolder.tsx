import React, { useEffect, useState } from 'react';

import { Theme, useTheme } from '@mui/material';
import {
  useDeleteFilesMutation,
  useDeleteFoldersMutation,
  useGetDocumentFileQuery,
  useGetDocumentFolderQuery,
  usePostDocumentFilesMutation,
  usePostDocumentFolderMutation,
  useUpdateFolderMutation,
} from '@/services/commonFeatures/documents';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  ImageUploadSchema,
  columns,
  defaultValuesImage,
  validationSchema,
} from './Folder.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { isNullOrEmpty } from '@/utils';
import { enqueueSnackbar } from 'notistack';

const useFolder: any = () => {
  const theme = useTheme<Theme>();
  const [value, setValue] = useState('search here');
  const [modalHeading, setModalHeading] = useState('Create New Folder');
  const [cardBox, setCardBox] = useState<string[]>([]);
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
  const [isImage, setIsImage] = useState(false);
  const [isGetRowValues, setIsGetRowValues] = useState<any>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isOpenFile, setIsOpenFile] = useState(false);
  const open = Boolean(anchorEl);
  const [postDocumentFolder] = usePostDocumentFolderMutation();
  const [postDocumentFiles] = usePostDocumentFilesMutation();
  const [updateFolder] = useUpdateFolderMutation();
  const [deleteFolders] = useDeleteFoldersMutation();
  const [deleteFiles] = useDeleteFilesMutation();
  const openSide = Boolean(anchorElSide);

  const searchParams = useSearchParams();

  const parentFolderId: any = searchParams?.get('folder');
  const parentFolderName: any = searchParams?.get('name');

  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetDocumentFolderQuery({ parentFolderId });

  const { data: image } = useGetDocumentFileQuery({ folderId: parentFolderId });
  const handlePdfOpen = () => setIsPdfOpen(true);
  const handlePdfClose = () => setIsPdfOpen(false);

  const addFile = useForm({
    resolver: yupResolver(ImageUploadSchema),
    defaultValues: defaultValuesImage,
  });

  const { watch: watchFile } = addFile;

  const onSubmitImage = async () => {
    const file = watchFile('file');
    const body = {
      name: parentFolderName,
      folderId: parentFolderId,
      file: file,
    };
    try {
      await postDocumentFiles(body).unwrap();
      setIsImage(false);
      enqueueSnackbar('Document Upload Successfully', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar('Error occurred', { variant: 'error' });
    }
  };

  const deleteUserFolders = async () => {
    try {
      await deleteFolders({
        ids: cardBox?.map((id) => `ids=${id}`)?.join('&'),
      }).unwrap();
      enqueueSnackbar('Folder Deleted Successfully', {
        variant: 'success',
      });
      setIsOpenDelete(false);
    } catch (error: any) {
      enqueueSnackbar(error?.message, { variant: 'error' });
      setIsOpenDelete(false);
    }
  };

  const deleteUserFiles = async () => {
    try {
      await deleteFiles({
        ids: isGetRowValues?.map((id: any) => `ids=${id}`)?.join('&'),
      }).unwrap();
      enqueueSnackbar('File Deleted Successfully', {
        variant: 'success',
      });
      setIsOpenFile(false);
    } catch (error: any) {
      enqueueSnackbar('Something went wrong!', { variant: 'error' });
    }
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
      parentFolderId: parentFolderId,
      name: watch('name'),
    };
    try {
      if (isEditOpenModal) {
        await updateFolder({
          id: cardBox,
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
    setAnchorEl(event?.currentTarget);
  };
  const handleClickSide = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElSide(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseSide = () => {
    setAnchorElSide(null);
  };

  const getRowValues = columns(
    setIsGetRowValues,
    setIsChecked,
    isChecked,
    isGetRowValues,
  );

  return {
    documentSubData: data?.data,
    imageData: image?.data?.files || [],
    getRowValues,
    setIsGetRowValues,
    setIsChecked,
    isChecked,
    isGetRowValues,
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
    cardBox,
    setCardBox,
    deleteUserFolders,
    setIsImage,
    isImage,
    onSubmitImage,
    addFile,
    deleteUserFiles,
    isOpenFile,
    setIsOpenFile,
  };
};

export default useFolder;
