import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  validationSchemaAddNewAssetTypes,
  assetTypesDefaultValues,
} from '../AddNewAssetTypesModal/AddNewAssetTypesModal.data';
import { useState } from 'react';

export const useTitleBar = () => {
  const [openEditAssetTypesModal, setEditNewAssetTypesModal] =
    useState<boolean>(false);
  const methods: any = useForm({
    resolver: yupResolver(validationSchemaAddNewAssetTypes),
    defaultValues: assetTypesDefaultValues,
  });

  const { handleSubmit, reset } = methods;
  const submitEditForm = async () => {
    enqueueSnackbar('Asset Type Edit Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    reset();
    setEditNewAssetTypesModal(false);
  };
  const handleSubmitEditForm = handleSubmit(submitEditForm);
  return {
    methods,
    handleSubmitEditForm,
    openEditAssetTypesModal,
    setEditNewAssetTypesModal,
  };
};
