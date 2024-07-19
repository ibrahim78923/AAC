import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  AssetFieldFormDefaultValues,
  AssetTypeFormValidationSchema,
} from '../AssetType.data';
import { useEffect } from 'react';
import { usePatchAssetTypeMutation } from '@/services/airServices/settings/asset-management/asset-type';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export default function useChildType({ childDetails, setChildDetails }: any) {
  const [patchChildAssetTypeTrigger, patchChildAssetTypeStatus] =
    usePatchAssetTypeMutation();

  const methods: any = useForm({
    resolver: yupResolver(AssetTypeFormValidationSchema),
    defaultValues: AssetFieldFormDefaultValues?.(childDetails?.childData),
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset(AssetFieldFormDefaultValues?.(childDetails?.childData));
  }, [childDetails, methods, reset]);

  const onSubmit = async (data: any) => {
    if (!!childDetails?.childData?._id) {
      updateChildType(data);
      return;
    }
    const body = {
      ...data,
      id: childDetails?.parentId,
    };
    try {
      await patchChildAssetTypeTrigger(body);
      successSnackbar('Asset Type Added Successfully!');
      onClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      onClose?.();
    }
  };

  const updateChildType = async (data: any) => {
    const body = {
      ...data,
      id: childDetails?.parentId,
      childId: childDetails?.childData?._id,
    };
    try {
      await patchChildAssetTypeTrigger(body);
      successSnackbar('Asset Type Updated Successfully!');
      onClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      onClose?.();
    }
  };

  const onClose = () => {
    setChildDetails({
      open: false,
      parentId: null,
      childData: null,
    });
  };

  return {
    onClose,
    methods,
    handleSubmit,
    onSubmit,
    patchChildAssetTypeStatus,
  };
}
