import React, { useEffect, useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import {
  useDeleteFoldersMutation,
  useGetDocumentFolderQuery,
  useGetAllFoldersListQuery,
  usePostDocumentFolderMutation,
  useUpdateFolderMutation,
} from '@/services/commonFeatures/documents';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useAuth from '@/hooks/useAuth';
import { defaultValuesFolder, validationSchema } from './Documents.data';
import { filteredEmptyValues } from '@/utils/api';
import { useLazyGetDynamicFieldsQuery } from '@/services/dynamic-fields';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_FIELDS_TYPES,
} from '@/utils/dynamic-forms';
import { MODAL_HEADING } from './Documents.data';
import {
  useLazyGetOrganizationUsersQuery,
  useLazyGetOrganizationTeamsQuery,
} from '@/services/dropdowns';
import { downloadLink } from '@/utils/download-blob';
import { useAppSelector } from '@/redux/store';

const useDocuments = () => {
  const socket = useAppSelector((state) => state?.chat?.socket);

  const theme = useTheme<Theme>();
  const { user }: any = useAuth();
  const orgId: any = user?.organization?._id;
  const orgUsersData = useLazyGetOrganizationUsersQuery();
  const orgTeamsData = useLazyGetOrganizationTeamsQuery();

  // Actions menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Get Folders
  const [searchValue, setSearchValue] = useState('');
  const [filterParams, setFilterParams] = useState({});
  const getFoldersParams = {
    meta: false,
  };

  let searchPayLoad;
  if (searchValue) {
    searchPayLoad = { search: searchValue };
  }
  const {
    data: getFoldersData,
    isLoading,
    isError,
    isFetching,
    isSuccess,
  } = useGetDocumentFolderQuery({
    params: {
      ...searchPayLoad,
      ...getFoldersParams,
      ...filterParams,
    },
  });

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

  // Check/ Uncheck folders
  const [selectedFolders, setSelectedFolders] = useState<any>([]);
  const handleCheckboxChange = (folder: any) => {
    const index = selectedFolders.findIndex(
      (item: any) => item._id === folder._id,
    );
    if (index > -1) {
      setSelectedFolders(
        selectedFolders.filter((item: any) => item._id !== folder._id),
      );
    } else {
      setSelectedFolders([...selectedFolders, folder]);
    }
  };

  // Delete Folders
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [deleteFolders, { isLoading: loadingDelete }] =
    useDeleteFoldersMutation();

  const deleteUserFolders = async () => {
    const ids = selectedFolders
      .map((item: any) => `ids=${item._id}`)
      ?.join('&');
    try {
      await deleteFolders({ ids }).unwrap();
      setIsOpenDelete(false);
      setSelectedFolders([]);
      successSnackbar('Folder Deleted Successfully');
    } catch (error: any) {
      errorSnackbar('Something went wrong!');
    }
  };

  // Create/Update Folder
  const [postDocumentFolder, { isLoading: loadingCreateFolder }] =
    usePostDocumentFolderMutation();
  const [updateFolder, { isLoading: loadingUpdate }] =
    useUpdateFolderMutation();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalHeading, setModalHeading] = useState(MODAL_HEADING.create);
  const [form, setForm] = useState<any>([]);
  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();

  const handleOpenCreateFolderModal = (heading: string) => {
    if (heading === MODAL_HEADING?.create) {
      setSelectedFolders([]);
    }
    setIsOpenModal(true);
    setModalHeading(heading);
  };
  const handleCloseCreateFolderModal = () => {
    setSelectedFolders([]);
    setIsOpenModal(false);
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
    resolver: yupResolver(validationSchema?.(form)),
    defaultValues: defaultValuesFolder?.(selectedFolders[0], form),
  });
  const { handleSubmit: handleMethodCreateFolder, reset: resetFolderForm } =
    methodsFolder;

  useEffect(() => {
    resetFolderForm(() => defaultValuesFolder(selectedFolders[0], form));
  }, [selectedFolders, resetFolderForm, form]);

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
        body[key] = value;
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
          id: selectedFolders[0]?._id,
          body: payload,
        }).unwrap();
        handleCloseCreateFolderModal();
        successSnackbar('Folder name update successfully.');
      } catch (error: any) {
        errorSnackbar('An error occured');
      }
    } else {
      try {
        await postDocumentFolder({ body: body }).unwrap();
        handleCloseCreateFolderModal();
        successSnackbar('Folder Created Successfully');
      } catch (error: any) {
        errorSnackbar('An error occured');
      }
    }
  };

  const handleCreateFolderSubmit = handleMethodCreateFolder(onSubmit);

  // Move Folder Drawer
  const [selectedMoveToFolderId, setSelectedMoveToFolderId] = useState('');
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string,
  ) => {
    setSelectedMoveToFolderId(id);
  };

  // Move Folder
  const [isOpenMoveFolderDrawer, setIsOpenMoveFolderDrawer] = useState(false);
  const [searchMoveFolder, setSearchMoveFolder] = useState('');

  const handleOpenMoveFolderDrawer = () => {
    setIsOpenMoveFolderDrawer(true);
  };
  const handleCloseMoveFolderDrawer = () => {
    setSelectedMoveToFolderId('');
    setIsOpenMoveFolderDrawer(false);
  };
  const getMoveFoldersParams = {
    meta: false,
  };

  let searchMovePayLoad;
  if (searchMoveFolder) {
    searchMovePayLoad = { search: searchMoveFolder };
  }
  const {
    data: getAllFoldersListData,
    isLoading: loadingGetAllFolders,
    isFetching: fetchingGetAllFolders,
  } = useGetAllFoldersListQuery(
    {
      params: {
        ...searchMovePayLoad,
        ...getMoveFoldersParams,
      },
    },
    { skip: !isOpenMoveFolderDrawer },
  );

  const moveFoldersData = (getAllFoldersListData?.data || []).filter(
    (folder: any) =>
      !selectedFolders?.some((item: any) => item._id === folder._id),
  );

  const handleSubmitMoveToFolder = async () => {
    const allSelectedFoldersIds = selectedFolders.map((item: any) => item._id);
    try {
      for (const item of allSelectedFoldersIds) {
        await updateFolder({
          id: item,
          body: {
            parentFolderId: selectedMoveToFolderId,
          },
        }).unwrap();
      }
      successSnackbar('Folder Moved Successfully');
      handleCloseMoveFolderDrawer();
    } catch (error: any) {
      errorSnackbar('Something went wrong!');
    }
  };

  const [isLoadingDownload, setIsLoadingDownload] = useState(false);
  const handleDownloadFolder = (folderId: string) => {
    const downloadFile = (payload: { url: string }) => {
      setIsLoadingDownload(false);
      handleClose();

      if (payload && payload.url) {
        downloadLink(payload.url);
        successSnackbar('Download started. Please wait...');
      } else {
        errorSnackbar('Failed to retrieve download link.');
      }
    };

    try {
      setIsLoadingDownload(true);
      socket.emit('downloadDocument', { id: folderId });
      socket.once('download-link', downloadFile);
    } catch (error: any) {
      setIsLoadingDownload(false);
      handleClose();
      errorSnackbar(
        error?.data?.message ?? 'An error occurred while downloading.',
      );
    }
  };

  return {
    theme,
    open,
    anchorEl,
    handleClick,
    handleClose,
    getFoldersData,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    selectedFolders,
    handleCheckboxChange,
    setSearchValue,
    openFilters,
    handleOpenFilters,
    handleCloseFilters,
    methodsFilter,
    handleFiltersSubmit,
    handleRefresh,
    isOpenModal,
    handleOpenCreateFolderModal,
    handleCloseCreateFolderModal,
    methodsFolder,
    orgUsersData,
    orgTeamsData,
    orgId,
    modalHeading,
    isOpenDelete,
    setIsOpenDelete,
    deleteUserFolders,
    loadingDelete,
    form,
    getDynamicFieldsStatus,
    handleCreateFolderSubmit,
    loadingCreateFolder,
    loadingUpdate,
    isOpenMoveFolderDrawer,
    handleOpenMoveFolderDrawer,
    handleCloseMoveFolderDrawer,
    setSearchMoveFolder,
    moveFoldersData,
    fetchingGetAllFolders,
    loadingGetAllFolders,
    selectedMoveToFolderId,
    handleListItemClick,
    handleSubmitMoveToFolder,
    handleDownloadFolder,
    isLoadingDownload,
  };
};

export default useDocuments;
