import React, { useState } from 'react';

import { Theme, useTheme } from '@mui/material';
import {
  useDeleteFilesMutation,
  useDeleteFoldersMutation,
  useGetDocumentFileQuery,
  useGetDocumentFolderQuery,
  usePostDocumentFilesMutation,
  usePostDocumentFolderMutation,
  useUpdateFileMutation,
  useUpdateFolderMutation,
} from '@/services/commonFeatures/documents';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  ImageUploadSchema,
  columns,
  defaultValuesFolder,
  defaultValuesImage,
  validationSchema,
} from './Folder.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { isNullOrEmpty } from '@/utils';
import { enqueueSnackbar } from 'notistack';
import { DOCUMENTS_ACTION_TYPES } from '@/constants';
import { PAGINATION } from '@/config';
import { errorSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import { FolderI } from './Folder.interface';

const useFolder: any = () => {
  const router = useRouter();
  const { user }: any = useAuth();
  const theme = useTheme<Theme>();
  const [searchValue, setSearchValue] = useState('');
  const [modalHeading, setModalHeading] = useState('');
  const [cardBox, setCardBox] = useState<string[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<FolderI | null>(null);
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
  const [selectedTableRows, setSelectedTableRows] = useState<any>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isOpenFile, setIsOpenFile] = useState(false);
  const [actionType, setActionType] = useState('');
  const [slectedFolderForMovingData, setSlectedFolderForMovingData] =
    useState<null | Record<string, any>>(null);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [selectedFile, setSelectedFile] = useState<null | Record<string, any>>(
    null,
  );
  const [page, setPage] = useState(PAGINATION.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [moveChildFolder, setMoveChildFolder] = useState(false);
  const open = Boolean(anchorEl);
  const [postDocumentFolder] = usePostDocumentFolderMutation();
  const [postDocumentFiles] = usePostDocumentFilesMutation();
  const [updateFolder] = useUpdateFolderMutation();
  const [updateFile] = useUpdateFileMutation();
  const [deleteFolders] = useDeleteFoldersMutation();
  const [deleteFiles] = useDeleteFilesMutation();
  const openSide = Boolean(anchorElSide);

  const searchParams = useSearchParams();
  const parentFolderId: any = searchParams?.get('folder');
  const parentFolderName: any = searchParams?.get('name');
  const permissionParams = {
    page: page,
    limit: pageLimit,
    ...(searchValue && !slectedFolderForMovingData && { search: searchValue }),
    folderId: selectedFolder ? selectedFolder._id : parentFolderId,
  };

  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetDocumentFolderQuery({
      parentFolderId,
    });

  const { data: documentParentsData } = useGetDocumentFolderQuery({
    ...(searchValue && { search: searchValue }),
    organizationId: user?.organization?._id,
  });

  const { data: filesData } = useGetDocumentFileQuery(permissionParams);
  const handlePdfOpen = () => setIsPdfOpen(true);
  const handlePdfClose = () => setIsPdfOpen(false);

  const addFile = useForm({
    resolver: yupResolver(ImageUploadSchema),
    defaultValues: defaultValuesImage,
  });

  const { watch: watchFile, reset: resetImage } = addFile;

  const onSubmitImage = async () => {
    const file = watchFile('file');
    const body = {
      folderId: selectedFolder ? selectedFolder?._id : parentFolderId,
      file: file,
    };
    try {
      await postDocumentFiles(body).unwrap();

      enqueueSnackbar('Document Upload Successfully', {
        variant: 'success',
      });
      resetImage(defaultValuesImage);
      setIsImage(false);
    } catch (error: any) {
      enqueueSnackbar(error?.message, { variant: 'error' });
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
        ids: selectedTableRows.join(','),
      }).unwrap();
      enqueueSnackbar('File Deleted Successfully', {
        variant: 'success',
      });
      setIsOpenFile(false);
    } catch (error: any) {
      enqueueSnackbar(error?.message, { variant: 'error' });
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

  const { handleSubmit, watch, reset } = FolderAdd;

  const onSubmit = async () => {
    const documentData = {
      parentFolderId: parentFolderId,
      name: watch('name'),
    };
    try {
      if (
        actionType === DOCUMENTS_ACTION_TYPES.MOVE_FOLDER ||
        actionType === DOCUMENTS_ACTION_TYPES.UPDATE_FOLDER
      ) {
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
      }
      reset(defaultValuesFolder);
      setIsOpenModal(false);
      setActionType('');
      setModalHeading('');
    } catch (error: any) {
      enqueueSnackbar(error?.message, { variant: 'error' });
    }
  };

  const onSubmitFile = async () => {
    if (moveChildFolder) {
      try {
        const _id = selectedFolder?._id;
        await updateFolder({
          id: _id,
          body: {
            parentFolderId: slectedFolderForMovingData?._id,
            name: selectedFolder?.name,
          },
        }).unwrap();

        enqueueSnackbar('SubFolder Moved Successfully', {
          variant: 'success',
        });
        setIsOpenFolderDrawer(false);
      } catch (error: any) {
        enqueueSnackbar('Something went wrong!', { variant: 'error' });
      }
    } else {
      if (slectedFolderForMovingData) {
        const fileData = {
          folderId: slectedFolderForMovingData?._id,
        };
        try {
          await updateFile({
            id: selectedFile?._id,
            body: fileData,
          }).unwrap();
          enqueueSnackbar('File Update Successfully', {
            variant: 'success',
          });
          setIsOpenFolderDrawer(false);
        } catch (error: any) {
          errorSnackbar(error?.message);
        }
      }
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
    setSelectedTableRows,
    setIsChecked,
    isChecked,
    selectedTableRows,
  );

  return {
    documentSubData: data?.data,
    filesData: filesData || [],
    getRowValues,
    setSelectedTableRows,
    setIsChecked,
    isChecked,
    selectedTableRows,
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
    searchValue,
    setSearchValue,
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
    setSelectedFolder,
    selectedFolder,
    deleteUserFolders,
    setIsImage,
    isImage,
    onSubmitImage,
    addFile,
    deleteUserFiles,
    isOpenFile,
    setIsOpenFile,
    setActionType,
    slectedFolderForMovingData,
    setSlectedFolderForMovingData,
    selectedFile,
    setSelectedFile,
    onSubmitFile,
    setPageLimit,
    pageLimit,
    setPage,
    page,
    router,
    moveChildFolder,
    setMoveChildFolder,
    documentParentsData,
    setSelectedFolderId,
    selectedFolderId,
  };
};

export default useFolder;
