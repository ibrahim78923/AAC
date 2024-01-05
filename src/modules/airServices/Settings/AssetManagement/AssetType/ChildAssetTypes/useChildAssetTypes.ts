import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  assetTypesDefaultValues,
  validationSchemaAddNewAssetTypes,
} from '../AddNewAssetTypesModal/AddNewAssetTypesModal.data';
import { usePatchAssetTypeMutation } from '@/services/airServices/settings/asset-management/asset-type';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useChildAssetTypes = (props: any) => {
  const { parentId, childId } = props;
  const [openAddNewChildModal, setOpenAddNewChildModal] = useState(false);
  const { palette }: any = useTheme();

  const methods: any = useForm({
    resolver: yupResolver(validationSchemaAddNewAssetTypes),
    defaultValues: assetTypesDefaultValues,
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
      const res: any = await patchAssetTypeTrigger(assetChildData);
      enqueueSnackbar(res?.data?.message && 'Asset Types Added Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      reset();
      setOpenAddNewChildModal(false);
    } catch (err: any) {
      enqueueSnackbar(err?.data?.message ?? 'Error! Please try again', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
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
