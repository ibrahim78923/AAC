import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  assetTypesDefaultValues,
  validationSchemaAddNewAssetTypes,
} from '../AddNewAssetTypesModal/AddNewAssetTypesModal.data';
import { usePatchAssetTypeMutation } from '@/services/airServices/settings/asset-management/asset-type';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useChildAssetTypes = (props: any) => {
  const { parentId, childId, assetTypeData } = props;
  const [openAddNewChildModal, setOpenAddNewChildModal] = useState(false);
  const { palette }: any = useTheme();

  const methods: any = useForm({
    resolver: yupResolver(validationSchemaAddNewAssetTypes),
    defaultValues: assetTypesDefaultValues(assetTypeData),
  });

  const { handleSubmit, reset } = methods;
  const [patchAssetTypeTrigger] = usePatchAssetTypeMutation();
  const submitServicesForm = async (formData: any) => {
    const assetChildData = {
      id: parentId ?? childId,
      name: formData?.name,
      description: formData?.description,
    };
    try {
      await patchAssetTypeTrigger(assetChildData);
      successSnackbar('Asset Types Added Successfully');
      reset();
      setOpenAddNewChildModal?.(false);
    } catch (err: any) {
      errorSnackbar();
    }
  };

  const handleSubmitServicesForm = handleSubmit(submitServicesForm);
  return {
    openAddNewChildModal,
    setOpenAddNewChildModal,
    palette,
    methods,
    handleSubmitServicesForm,
  };
};
