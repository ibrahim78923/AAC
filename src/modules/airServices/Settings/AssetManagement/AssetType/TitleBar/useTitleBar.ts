import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  validationSchemaAddNewAssetTypes,
  assetTypesDefaultValues,
} from '../AddNewAssetTypesModal/AddNewAssetTypesModal.data';
import { useEffect, useState } from 'react';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { usePatchEditAssetTypeMutation } from '@/services/airServices/settings/asset-management/asset-type';

export const useTitleBar = (props: any) => {
  const { assetTypeData } = props;
  const [openEditAssetTypesModal, setEditNewAssetTypesModal] =
    useState<boolean>(false);
  const methods: any = useForm({
    resolver: yupResolver(validationSchemaAddNewAssetTypes),
    defaultValues: assetTypesDefaultValues(assetTypeData),
  });
  const [editAssetTypeTrigger] = usePatchEditAssetTypeMutation();
  const { handleSubmit, reset } = methods;
  useEffect(() => {
    reset(assetTypesDefaultValues(assetTypeData));
  }, [openEditAssetTypesModal]);
  const submitEditForm = async (formData: any) => {
    const assetEditData = {
      id: assetTypeData?._id,
      name: formData?.name,
      description: formData?.description,
    };
    try {
      await editAssetTypeTrigger(assetEditData);
      successSnackbar('Asset Type Edit Successfully');
      reset();
      setEditNewAssetTypesModal?.(false);
    } catch (error: any) {
      errorSnackbar();
    }
  };
  const handleSubmitEditForm = handleSubmit(submitEditForm);
  return {
    methods,
    handleSubmitEditForm,
    openEditAssetTypesModal,
    setEditNewAssetTypesModal,
  };
};
