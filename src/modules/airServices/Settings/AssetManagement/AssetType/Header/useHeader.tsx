import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  validationSchemaAddNewAssetTypes,
  assetTypesDefaultValues,
} from '../AddNewAssetTypesModal/AddNewAssetTypesModal.data';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { usePostAssetTypeMutation } from '@/services/airServices/settings/asset-management/asset-type';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useHeader = (props: any) => {
  const { assetTypeData } = props;
  const [openAddNewAssetTypesModal, setOpenAddNewAssetTypesModal] =
    useState<boolean>(false);
  const router = useRouter();
  const methods: any = useForm({
    resolver: yupResolver(validationSchemaAddNewAssetTypes),
    defaultValues: assetTypesDefaultValues(assetTypeData),
  });

  const { handleSubmit, reset } = methods;
  const [postAssetTypeTrigger, postAssetTypeProgress] =
    usePostAssetTypeMutation();
  const isLoading = postAssetTypeProgress?.isLoading;
  const submitAddForm = async (formData: any) => {
    try {
      await postAssetTypeTrigger(formData);
      successSnackbar('Asset Types Added Successfully');
      reset();
      setOpenAddNewAssetTypesModal?.(false);
    } catch (err: any) {
      errorSnackbar();
    }
  };

  const handleSubmitAddForm = handleSubmit(submitAddForm);

  return {
    router,
    handleSubmitAddForm,
    methods,
    openAddNewAssetTypesModal,
    setOpenAddNewAssetTypesModal,
    isLoading,
  };
};
