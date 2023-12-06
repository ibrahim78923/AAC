import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  validationSchemaAddNewAssetTypes,
  defaultValues,
} from '../AddNewAssetTypesModal/AddNewAssetTypesModal.data';
import { useState } from 'react';
import { useRouter } from 'next/router';

export const useHeader = () => {
  const [openAddNewAssetTypesModal, setOpenAddNewAssetTypesModal] =
    useState<boolean>(false);
  const router = useRouter();
  const addNewAssetTypesMethods: any = useForm({
    resolver: yupResolver(validationSchemaAddNewAssetTypes),
    defaultValues: defaultValues,
  });

  const { handleSubmit, reset } = addNewAssetTypesMethods;
  const submitAddForm = async () => {
    enqueueSnackbar('Asset Types Added Successfully', {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    reset();
    setOpenAddNewAssetTypesModal(false);
  };

  return {
    router,
    handleSubmit,
    addNewAssetTypesMethods,
    submitAddForm,
    openAddNewAssetTypesModal,
    setOpenAddNewAssetTypesModal,
  };
};
