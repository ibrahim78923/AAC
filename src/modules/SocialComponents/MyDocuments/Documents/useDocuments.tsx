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
import { DOCUMENTS_ACTION_TYPES } from '@/constants';
import { filteredEmptyValues, successSnackbar } from '@/utils/api';
import { useLazyGetDynamicFieldsQuery } from '@/services/dynamic-fields';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_FIELDS_TYPES,
  dynamicFormInitialValue,
} from '@/utils/dynamic-forms';

const useDocuments = () => {
  const theme = useTheme<Theme>();
  const [searchValue, setSearchValue] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isOpenFolderDrawer, setIsOpenFolderDrawer] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEditOpenModal, setIsEditOpenModal] = useState();
  const [modalHeading, setModalHeading] = useState('');
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [postDocumentFolder] = usePostDocumentFolderMutation();
  const [updateFolder] = useUpdateFolderMutation();
  const [deleteFolders] = useDeleteFoldersMutation();
  const [allSelectedFoldersIds, setAllSelectedFoldersIds] = useState<string[]>(
    [],
  );
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [actionType, setActionType] = useState('');
  const [selectedFolder, setSelectedFolder] = useState(null);
  const { user }: any = useAuth();

  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetDocumentFolderQuery({
      ...(searchValue && { search: searchValue }),
      organizationId: user?.organization?._id,
    });

  const deleteUserFolders = async () => {
    try {
      await deleteFolders({
        ids: allSelectedFoldersIds?.map((id) => `ids=${id}`)?.join('&'),
      }).unwrap();
      successSnackbar('Folder Deleted Successfully');
      setIsOpenDelete(false);
      setAllSelectedFoldersIds([]);
    } catch (error: any) {
      enqueueSnackbar('Something went wrong!', { variant: 'error' });
    }
  };

  const MoveToFolder = async () => {
    try {
      for (const item of allSelectedFoldersIds) {
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
    if (allSelectedFoldersIds?.includes(id)) {
      setAllSelectedFoldersIds(
        allSelectedFoldersIds?.filter((item: string) => item != id),
      );
    } else {
      setAllSelectedFoldersIds([...allSelectedFoldersIds, id]);
    }
  };

  const handleBoxClick = (itemId: string) => {
    setSelectedItemId(itemId === selectedItemId ? null : itemId);
  };

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [form, setForm] = useState<any>([]);
  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();

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

  let filteredData;

  useEffect(() => {
    filteredData = data?.data?.folders?.find(
      (item: any) => item._id === allSelectedFoldersIds[0],
    );

    const initialValues: any = dynamicFormInitialValue(filteredData, form);

    if (initialValues) {
      Object.keys(initialValues).forEach((name) => {
        const value = initialValues[name];
        setValue(name, value);
      });
    }
  }, [allSelectedFoldersIds?.length > 0]);

  const FolderAdd: any = useForm<any>({
    resolver: yupResolver(validationSchema?.(form)),
    defaultValues: defaultValuesFolder?.(
      data?.data?.folders?.find(
        (item: any) => item._id === allSelectedFoldersIds[0],
      ),
      form,
    ),
  });

  useEffect(() => {
    if (isEditOpenModal) {
      const { name } = isEditOpenModal;
      FolderAdd?.setValue('name', name);
    }
  }, [isEditOpenModal, FolderAdd]);

  const { handleSubmit, reset, setValue } = FolderAdd;

  const onSubmit = async (values: any) => {
    const filteredEmptyData = filteredEmptyValues(values);

    const customFields: any = {};
    const body: any = {};

    const customFieldKeys = new Set(
      form?.map((field: any) => field?.componentProps?.label),
    );

    Object?.entries(filteredEmptyData)?.forEach(([key, value]) => {
      if (customFieldKeys?.has(key)) {
        if (value instanceof Date) {
          value = value?.toISOString();
        }
        if (
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

    try {
      if (
        actionType === DOCUMENTS_ACTION_TYPES.MOVE_FOLDER ||
        actionType === DOCUMENTS_ACTION_TYPES.UPDATE_FOLDER
      ) {
        await updateFolder({
          id: allSelectedFoldersIds,
          body: body,
        }).unwrap();
        enqueueSnackbar('Folder Update Successfully', {
          variant: 'success',
        });
      } else {
        await postDocumentFolder({
          body: body,
        }).unwrap();
        enqueueSnackbar('Folder Created Successfully', {
          variant: 'success',
        });
      }
      reset(validationSchema);
      setIsOpenModal(false);
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
  };

  const { handleSubmit: handleMethodCreateFolder } = FolderAdd;

  const handleCreateFolderSubmit = handleMethodCreateFolder(onSubmit);

  return {
    documentData: data?.data?.folders,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    open,
    handleClick,
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
    handleSubmit,
    onSubmit,
    FolderAdd,
    handleCheckboxChange,
    allSelectedFoldersIds,
    modalHeading,
    setModalHeading,
    deleteUserFolders,
    selectedItemId,
    setSelectedItemId,
    handleBoxClick,
    MoveToFolder,
    setActionType,
    setSelectedFolder,
    selectedFolder,
    form,
    getDynamicFieldsStatus,
    handleCreateFolderSubmit,
  };
};

export default useDocuments;
