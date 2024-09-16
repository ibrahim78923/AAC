import React, { useEffect, useState } from 'react';
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
import { useForm } from 'react-hook-form';
import {
  uploadDocumentDefaultValues,
  uploadDocumentValidationSchema,
  columns,
} from './Folder.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
// import { DOCUMENTS_ACTION_TYPES } from '@/constants';
import { PAGINATION } from '@/config';
import {
  errorSnackbar,
  filteredEmptyValues,
  successSnackbar,
} from '@/utils/api';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_FIELDS_TYPES,
} from '@/utils/dynamic-forms';
import { useLazyGetDynamicFieldsQuery } from '@/services/dynamic-fields';
import {
  useLazyGetOrganizationUsersQuery,
  useLazyGetOrganizationTeamsQuery,
} from '@/services/dropdowns';
import {
  MODAL_HEADING,
  defaultValuesFolder,
  validationSchema,
} from '../Documents/Documents.data';
import { DOCUMENTS_TYPE, Quick_Links_Routes } from '@/constants';

const useFolder: any = () => {
  const theme = useTheme<Theme>();
  const { user }: any = useAuth();
  const router = useRouter();
  const { name, folderId } = router?.query;
  const parentFolderName = name;
  const orgId: any = user?.organization?._id;
  const orgUsersData = useLazyGetOrganizationUsersQuery();
  const orgTeamsData = useLazyGetOrganizationTeamsQuery();

  // Folders Actions
  const [anchorElSide, setAnchorElSide] = useState<null | HTMLElement>(null);
  const openSide = Boolean(anchorElSide);
  const handleClickSide = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElSide(event?.currentTarget);
  };
  const handleCloseSide = () => {
    setAnchorElSide(null);
  };

  // handle Click Select Folder
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  useEffect(() => {
    if (folderId) {
      if (typeof folderId === 'string') {
        setSelectedFolderId(folderId);
      } else if (Array.isArray(folderId)) {
        setSelectedFolderId(folderId[0]);
      }
    }
  }, []);

  const handleClickSelectFolder = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string,
  ) => {
    setSelectedFolderId(id);
  };

  // Get Subfolders
  const {
    data: dataSubfolders,
    isLoading: isLoadingSubfolders,
    isFetching: isFetchingSubfolders,
  } = useGetDocumentFolderQuery({
    params: {
      meta: false,
      parentFolderId: folderId,
    },
  });

  const subfolderData = dataSubfolders?.data?.find(
    (item: any) => item?._id === selectedFolderId,
  );

  // Create/Update Folder
  const [postDocumentFolder, { isLoading: loadingCreateFolder }] =
    usePostDocumentFolderMutation();
  const [updateFolder, { isLoading: loadingUpdate }] =
    useUpdateFolderMutation();
  const [isOpenCreateFolderModal, setIsOpenCreateFolderModal] = useState(false);
  const [modalHeading, setModalHeading] = useState(MODAL_HEADING.create);
  const [form, setForm] = useState<any>([]);
  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();

  const handleOpenCreateFolderModal = (heading: string) => {
    setIsOpenCreateFolderModal(true);
    setModalHeading(heading);
  };
  const handleCloseCreateFolderModal = () => {
    setIsOpenCreateFolderModal(false);
  };

  const getDynamicFormData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_COMMON,
      moduleType: DYNAMIC_FIELDS?.MT_DOCUMENT,
    };
    const getDynamicFieldsParameters = { params };

    try {
      const res: any = await getDynamicFieldsTrigger(
        getDynamicFieldsParameters,
      )?.unwrap();
      setForm(res);
    } catch (error: any) {
      setForm([]);
    }
  };

  useEffect(() => {
    getDynamicFormData();
  }, []);

  const methodsFolder: any = useForm<any>({
    resolver: yupResolver(validationSchema(form)),
    defaultValues: defaultValuesFolder?.(subfolderData, form),
  });

  const {
    handleSubmit: handleMethodCreateFolder,
    reset: resetFolderForm,
    watch: watchCreateFolder,
  } = methodsFolder;

  const watchCreateVisibleTo = watchCreateFolder('visibleTo');
  useEffect(() => {
    resetFolderForm(() => defaultValuesFolder(subfolderData, form));
  }, [selectedFolderId, resetFolderForm, form]);

  const onSubmit = async (values: any) => {
    const filteredEmptyData = filteredEmptyValues(values);

    const customFields: any = {};
    const body: any = {};

    const customFieldKeys = new Set(
      form?.map((field: any) => field?.componentProps?.label),
    );

    Object?.entries(filteredEmptyData)?.forEach(([key, value]: any) => {
      if (customFieldKeys?.has(key)) {
        if (value instanceof Date) {
          value = value?.toISOString();
        } else if (
          typeof value === DYNAMIC_FORM_FIELDS_TYPES?.OBJECT &&
          !Array?.isArray(value) &&
          value !== null
        ) {
          customFields[key] = { ...customFields[key], ...value };
        } else {
          customFields[key] = value;
        }
      } else {
        if (key === 'userIds' || key === 'teamIds') {
          body[key] = value?.map((item: any) => item?._id);
        } else {
          body[key] = value;
        }
      }
    });

    if (Object?.keys(customFields)?.length > 0) {
      body.customFields = customFields;
    }

    if (modalHeading === MODAL_HEADING?.update) {
      const payload = {
        name: body?.name,
      };
      try {
        await updateFolder({
          id: selectedFolderId,
          body: payload,
        }).unwrap();
        handleCloseCreateFolderModal();
        enqueueSnackbar('Folder name update successfully.', {
          variant: 'success',
        });
      } catch (error: any) {
        enqueueSnackbar('An error occured', {
          variant: 'error',
        });
      }
    } else {
      try {
        const payload = {
          parentFolderId: folderId,
          ...body,
        };
        await postDocumentFolder({
          body: payload,
        }).unwrap();
        handleCloseCreateFolderModal();
        enqueueSnackbar('Folder Created Successfully', {
          variant: 'success',
        });
      } catch (error: any) {
        enqueueSnackbar('An error occured', {
          variant: 'error',
        });
      }
    }
  };

  const handleCreateFolderSubmit = handleMethodCreateFolder(onSubmit);

  // Delete Folders
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [deleteFolders, { isLoading: loadingDelete }] =
    useDeleteFoldersMutation();

  const deleteUserFolders = async () => {
    const idsArray = [selectedFolderId];
    const ids = idsArray?.map((item: any) => `ids=${item}`).join('&') || [];
    try {
      await deleteFolders({ ids }).unwrap();
      setIsOpenDelete(false);
      successSnackbar('Folder Deleted Successfully');
      if (folderId === selectedFolderId) {
        router.push(Quick_Links_Routes?.DOCUMENT);
      } else {
        if (typeof folderId === 'string') {
          setSelectedFolderId(folderId);
        } else if (Array.isArray(folderId)) {
          setSelectedFolderId(folderId[0]);
        }
      }
    } catch (error: any) {
      enqueueSnackbar('Something went wrong!', { variant: 'error' });
    }
  };

  // Upload Document
  const [postDocumentFiles, { isLoading: loadingUploadDocument }] =
    usePostDocumentFilesMutation();
  const [isOpenUploadDocModal, setIsOpenUploadDocModal] = useState(false);
  const [visibleTo, setVisibleTo] = useState('');
  const methodsUploadDocument = useForm<any>({
    resolver: yupResolver(uploadDocumentValidationSchema(visibleTo)),
    defaultValues: uploadDocumentDefaultValues,
  });

  const {
    handleSubmit: submitUploadDocument,
    reset: resetUploadDocument,
    watch,
  } = methodsUploadDocument;
  const watchVisibleTo = watch('visibleTo');
  useEffect(() => {
    setVisibleTo(watchVisibleTo);
  }, [watchVisibleTo]);

  const handleOpenUploadDocModal = () => {
    setIsOpenUploadDocModal(true);
  };
  const handleCloseUploadDocModal = () => {
    resetUploadDocument();
    setIsOpenUploadDocModal(false);
  };

  const onSubmitUploadDocument = async (values: any) => {
    const filteredValues = filteredEmptyValues(values);
    const formData = new FormData();
    formData.append('folderId', selectedFolderId as string);
    Object.entries(filteredValues)?.forEach(([key, value]: any) => {
      if (key === 'userIds' || key === 'teamIds') {
        formData.append(
          key,
          value.map((item: any) => item?._id),
        );
      } else {
        formData.append(key, value);
      }
    });

    try {
      await postDocumentFiles({ body: formData }).unwrap();
      enqueueSnackbar('Document Upload Successfully', {
        variant: 'success',
      });
      handleCloseUploadDocModal();
    } catch (error: any) {
      enqueueSnackbar(error?.message, { variant: 'error' });
    }
  };
  const handleUploadDocumentSubmit = submitUploadDocument(
    onSubmitUploadDocument,
  );
  // Ends Upload Document

  // Documen Files Actions
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Get Files/Documents Data
  const [selectedRow, setSelectedRow]: any = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [filterParams, setFilterParams] = useState({});
  const [searchValue, setSearchValue] = useState(null);

  let selectedFolderParam;
  if (selectedFolderId) {
    selectedFolderParam = {
      folderId: selectedFolderId,
    };
  }

  const paginationParams = {
    page: page,
    limit: pageLimit,
  };

  let searchPayLoad: any;
  if (searchValue) {
    searchPayLoad = { search: searchValue };
  }

  const {
    data: getFilesData,
    isLoading: loadingFiles,
    isFetching: fetchingFiles,
  } = useGetDocumentFileQuery(
    {
      params: {
        ...selectedFolderParam,
        ...searchPayLoad,
        ...paginationParams,
        ...filterParams,
      },
    },
    { skip: !selectedFolderId },
  );
  // Filters
  const [openFilters, setOpenFilters] = useState(false);
  const methodsFilter = useForm();
  const { handleSubmit: handleMethodFilter, reset: resetFilters } =
    methodsFilter;
  const handleOpenFilters = () => {
    setOpenFilters(true);
  };
  const handleCloseFilters = () => {
    setOpenFilters(false);
  };

  const onSubmitFilters = async (values: any) => {
    setFilterParams(values);
    handleCloseFilters();
  };
  const handleFiltersSubmit = handleMethodFilter(onSubmitFilters);

  // Refresh
  const handleRefresh = () => {
    setFilterParams({});
    resetFilters();
  };

  useEffect(() => {
    if (selectedRow.length === 1) {
      const selectedRowData = getFilesData?.data?.files?.find(
        (item: any) => item._id === selectedRow[0],
      );
      setSelectedRowData(selectedRowData);
    } else {
      setSelectedRowData(null);
    }
  }, [selectedRow]);

  // Generate Link
  const [isOpenGenerateLinkModal, setIsOpenGenerateLinkModal] = useState(false);
  const [isOpenSendEmailModal, setIsOpenSendEmailModal] = useState(false);

  // Delete Files
  const [deleteFiles, { isLoading: loadingDeleteFiles }] =
    useDeleteFilesMutation();
  const [isOpenDeleteFileModal, setIsOpenDeleteFileModal] = useState(false);

  const handleDeleteFiles = async () => {
    try {
      await deleteFiles({
        ids: selectedRow.join(','),
      }).unwrap();
      enqueueSnackbar('File Deleted Successfully', {
        variant: 'success',
      });
      setSelectedRow([]);
      setIsOpenDeleteFileModal(false);
    } catch (error: any) {
      enqueueSnackbar(error?.message, { variant: 'error' });
    }
  };

  // Update File
  const [updateFile, { isLoading: loadingUpdateFile }] =
    useUpdateFileMutation();

  // Move Files & Folders
  const [isOpenMoveDocumentDrawer, setIsOpenMoveDocumentDrawer] =
    useState(false);
  const [selectedMoveToFolderId, setSelectedMoveToFolderId] = useState('');
  const [searchMoveFolder, setSearchMoveFolder] = useState('');
  const [documentType, setDocumentType] = useState(DOCUMENTS_TYPE?.FOLDER);

  const handleOpenMoveDocumentDrawer = (documentType: string) => {
    setDocumentType(documentType);
    setIsOpenMoveDocumentDrawer(true);
  };
  const handleCloseMoveDocumentDrawer = () => {
    setIsOpenMoveDocumentDrawer(false);
    setSelectedMoveToFolderId('');
  };

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string,
  ) => {
    setSelectedMoveToFolderId(id);
  };

  const getMoveFoldersParams = {
    meta: false,
  };

  let searchMovePayLoad;
  if (searchMoveFolder) {
    searchMovePayLoad = { search: searchMoveFolder };
  }
  const {
    data: getMoveFoldersData,
    isLoading: loadingGetMoveFolders,
    isFetching: fetchingGetMoveFolders,
  } = useGetDocumentFolderQuery({
    params: {
      ...searchMovePayLoad,
      ...getMoveFoldersParams,
    },
  });

  const moveFoldersData = (getMoveFoldersData?.data || []).filter(
    (folder: any) => folder._id !== selectedFolderId,
  );

  const handleSubmitMoveDocument = async () => {
    if (documentType === DOCUMENTS_TYPE?.FOLDER) {
      try {
        await updateFolder({
          id: selectedFolderId,
          body: {
            parentFolderId: selectedMoveToFolderId,
          },
        }).unwrap();
        enqueueSnackbar('Folder Moved Successfully', {
          variant: 'success',
        });
        handleCloseMoveDocumentDrawer();
        if (selectedFolderId === folderId) {
          router.push(Quick_Links_Routes?.DOCUMENT);
        }
      } catch (error: any) {
        enqueueSnackbar('Something went wrong!', { variant: 'error' });
      }
    }

    if (documentType === DOCUMENTS_TYPE?.FILE) {
      const fileId = selectedRow[0];
      const payload = {
        folderId: selectedMoveToFolderId,
      };
      try {
        await updateFile({
          id: fileId,
          body: payload,
        }).unwrap();
        enqueueSnackbar('File Update Successfully', {
          variant: 'success',
        });
        handleCloseMoveDocumentDrawer();
        setSelectedRow([]);
      } catch (error: any) {
        errorSnackbar(error?.message);
      }
    }
  };

  // Preview File
  const [isOpenPreviewModal, setIsOpenPreviewModal] = useState(false);
  const handleOpenPreviewModal = () => {
    setIsOpenPreviewModal(true);
  };
  const handleClosePreviewModal = () => {
    setIsOpenPreviewModal(false);
  };

  const getColumns = columns(selectedRow, setSelectedRow);

  return {
    theme,
    router,
    anchorElSide,
    openSide,
    handleCloseSide,
    handleClickSide,
    orgId,
    orgUsersData,
    orgTeamsData,
    folderId,
    parentFolderName,

    dataSubfolders,
    selectedFolderId,
    handleClickSelectFolder,
    isFetchingSubfolders,
    isLoadingSubfolders,

    isOpenDelete,
    setIsOpenDelete,
    loadingDelete,
    deleteUserFolders,

    isOpenUploadDocModal,
    handleOpenUploadDocModal,
    handleCloseUploadDocModal,
    loadingUploadDocument,
    handleUploadDocumentSubmit,
    methodsUploadDocument,
    watchVisibleTo,

    setPage,
    setPageLimit,
    getColumns,
    setSearchValue,
    selectedRow,
    selectedRowData,
    getFilesData,
    loadingFiles,
    fetchingFiles,
    openFilters,
    handleOpenFilters,
    handleCloseFilters,
    methodsFilter,
    handleFiltersSubmit,
    handleRefresh,

    modalHeading,
    isOpenCreateFolderModal,
    handleOpenCreateFolderModal,
    handleCloseCreateFolderModal,
    loadingUpdate,
    loadingCreateFolder,
    methodsFolder,
    watchCreateVisibleTo,
    form,
    getDynamicFieldsStatus,
    handleCreateFolderSubmit,

    anchorEl,
    open,
    handleClick,
    handleClose,

    isOpenGenerateLinkModal,
    setIsOpenGenerateLinkModal,
    isOpenSendEmailModal,
    setIsOpenSendEmailModal,

    isOpenDeleteFileModal,
    setIsOpenDeleteFileModal,
    loadingDeleteFiles,
    handleDeleteFiles,

    isOpenMoveDocumentDrawer,
    handleOpenMoveDocumentDrawer,
    handleCloseMoveDocumentDrawer,
    fetchingGetMoveFolders,
    loadingGetMoveFolders,
    setSearchMoveFolder,
    moveFoldersData,
    selectedMoveToFolderId,
    handleListItemClick,
    loadingUpdateFile,
    handleSubmitMoveDocument,

    isOpenPreviewModal,
    handleOpenPreviewModal,
    handleClosePreviewModal,
  };
};

export default useFolder;
