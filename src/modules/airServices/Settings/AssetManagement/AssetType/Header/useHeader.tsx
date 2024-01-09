import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  validationSchemaAddNewAssetTypes,
  assetTypesDefaultValues,
} from '../AddNewAssetTypesModal/AddNewAssetTypesModal.data';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { usePostAssetTypeMutation } from '@/services/airServices/settings/asset-management/asset-type';

export const useHeader = () => {
  const [openAddNewAssetTypesModal, setOpenAddNewAssetTypesModal] =
    useState<boolean>(false);
  const router = useRouter();
  const methods: any = useForm({
    resolver: yupResolver(validationSchemaAddNewAssetTypes),
    defaultValues: assetTypesDefaultValues,
  });

  const { handleSubmit, reset } = methods;
  const [postAssetTypeTrigger, postAssetTypeProgress] =
    usePostAssetTypeMutation();
  const isLoading = postAssetTypeProgress?.isLoading;
  const submitAddForm = async (formData: any) => {
    try {
      const res: any = await postAssetTypeTrigger(formData);
      enqueueSnackbar(res?.data?.message && 'Asset Types Added Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      reset();
      setOpenAddNewAssetTypesModal(false);
    } catch (err: any) {
      enqueueSnackbar(err?.data?.message ?? 'Error! Please try again', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
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
