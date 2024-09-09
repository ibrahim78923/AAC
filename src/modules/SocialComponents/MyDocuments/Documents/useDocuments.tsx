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
import { defaultValuesFolder, validationSchema } from './Documents.data';
import { filteredEmptyValues, successSnackbar } from '@/utils/api';
import { useLazyGetDynamicFieldsQuery } from '@/services/dynamic-fields';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_FIELDS_TYPES,
} from '@/utils/dynamic-forms';
import { MODAL_HEADING } from './Documents.data';
import { useLazyGetOrganizationUsersQuery } from '@/services/dropdowns';

const useDocuments = () => {
  const theme = useTheme<Theme>();
  const { user }: any = useAuth();
  const orgId: any = user?.organization?._id;
  const orgUsersData = useLazyGetOrganizationUsersQuery();

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
      enqueueSnackbar('Something went wrong!', { variant: 'error' });
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
  const {
    handleSubmit: handleMethodCreateFolder,
    reset: resetFolderForm,
    watch,
  } = methodsFolder;
  const watchVisibleTo = watch('visibleTo');
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
          id: selectedFolders[0]?._id,
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
        await postDocumentFolder({ body: body }).unwrap();
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
      enqueueSnackbar('Folder Moved Successfully', {
        variant: 'success',
      });
      setSelectedFolders([]);
      setIsOpenMoveFolderDrawer(false);
    } catch (error: any) {
      enqueueSnackbar('Something went wrong!', { variant: 'error' });
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
    watchVisibleTo,
    orgUsersData,
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
    setIsOpenMoveFolderDrawer,
    setSearchMoveFolder,
    moveFoldersData,
    fetchingGetMoveFolders,
    loadingGetMoveFolders,
    selectedMoveToFolderId,
    handleListItemClick,
    handleSubmitMoveToFolder,
  };
};

export default useDocuments;
