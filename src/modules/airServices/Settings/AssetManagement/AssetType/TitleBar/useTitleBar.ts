import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  validationSchemaAddNewAssetTypes,
  defaultValues,
} from '../AddNewAssetTypesModal/AddNewAssetTypesModal.data';
import { useState } from 'react';

export const useTitleBar = () => {
  const [openEditAssetTypesModal, setEditNewAssetTypesModal] =
    useState<boolean>(false);
  const editAssetTypesMethods: any = useForm({
    resolver: yupResolver(validationSchemaAddNewAssetTypes),
    defaultValues: defaultValues,
  });

  const { handleSubmit, reset } = editAssetTypesMethods;
  const submitAddForm = async () => {
    enqueueSnackbar('Asset Type Edit Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    reset();
    setEditNewAssetTypesModal(false);
  };

  return {
    handleSubmit,
    editAssetTypesMethods,
    submitAddForm,
    openEditAssetTypesModal,
    setEditNewAssetTypesModal,
  };
};
