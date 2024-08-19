import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createFolderDefaultValues,
  createFolderValidationSchema,
} from './EmailFolder.data';
import { enqueueSnackbar } from 'notistack';
import {
  useGetEmailFolderQuery,
  usePostEmailFolderMutation,
} from '@/services/airMarketer/emailFolder';
import { useLazyGetDynamicFieldsQuery } from '@/services/dynamic-fields';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_FIELDS_TYPES,
} from '@/utils/dynamic-forms';
import { filteredEmptyValues } from '@/utils/api';

const useEmailFolder = () => {
  const [allSelectedFoldersIds, setAllSelectedFoldersIds] = useState<string[]>(
    [],
  );
  const [searchValue, setSearchValue] = useState('');
  const { data: allFolder, isLoading } = useGetEmailFolderQuery({
    ...(searchValue && { search: searchValue }),
  });
  const [form, setForm] = useState<any>([]);

  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();

  const getDynamicFormData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_MARKETING,
      moduleType: DYNAMIC_FIELDS?.MT_EMAIL_FOLDER,
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

  // Create Folder
  const methodsCreateFolder = useForm({
    resolver: yupResolver(createFolderValidationSchema?.(form)),
    defaultValues: createFolderDefaultValues?.(),
  });
  const {
    handleSubmit: handleMethodCreateFolder,
    reset: resetCreateFolderForm,
  } = methodsCreateFolder;
  const [openModalCreateFolder, setOpenModalCreateFolder] = useState(false);
  const handleOpenModalCreateFolder = () => {
    setOpenModalCreateFolder(true);
  };
  const handleCloseModalCreateFolder = () => {
    setOpenModalCreateFolder(false);
  };
  const [postEmailFolder, { isLoading: isLoadingPost }] =
    usePostEmailFolderMutation();

  const onSubmitCreateFolder = async (values: any) => {
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
      await postEmailFolder({ body })?.unwrap();
      handleCloseModalCreateFolder();
      resetCreateFolderForm();
      enqueueSnackbar('Created new folder successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };
  const handleCreateFolderSubmit =
    handleMethodCreateFolder(onSubmitCreateFolder);

  return {
    openModalCreateFolder,
    handleOpenModalCreateFolder,
    handleCloseModalCreateFolder,
    methodsCreateFolder,
    handleCreateFolderSubmit,
    allFolder,
    allSelectedFoldersIds,
    setAllSelectedFoldersIds,
    searchValue,
    setSearchValue,
    isLoading,
    isLoadingPost,
    form,
    getDynamicFieldsStatus,
  };
};
export default useEmailFolder;
