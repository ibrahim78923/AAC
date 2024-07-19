import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  AssetFieldFormDefaultValues,
  AssetTypeFormValidationSchema,
} from '../AssetType.data';
import { useEffect } from 'react';
import {
  usePatchEditAssetTypeMutation,
  usePostAssetTypeMutation,
} from '@/services/airServices/settings/asset-management/asset-type';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export default function useParentType({
  parentDetails,
  setParentDetails,
}: any) {
  const [postAssetTypeTrigger, postAssetTypeStatus] =
    usePostAssetTypeMutation();
  const [patchAssetTypeTrigger, patchAssetTypeStatus] =
    usePatchEditAssetTypeMutation();

  const methods: any = useForm({
    resolver: yupResolver(AssetTypeFormValidationSchema),
    defaultValues: AssetFieldFormDefaultValues?.(parentDetails?.parentData),
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset(AssetFieldFormDefaultValues?.(parentDetails?.parentData));
  }, [parentDetails, methods, reset]);

  const onSubmit = async (data: any) => {
    if (!!parentDetails?.parentData?._id) {
      updateParentType(data);
      return;
    }

    try {
      await postAssetTypeTrigger(data);
      successSnackbar('Asset Type Added Successfully!');
      onClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      onClose?.();
    }
  };

  const updateParentType = async (data: any) => {
    const body = {
      ...data,
      id: parentDetails?.parentData?._id,
    };

    try {
      await patchAssetTypeTrigger(body);
      successSnackbar('Asset Type Updated Successfully!');
      onClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      onClose?.();
    }
  };

  const onClose = () => {
    setParentDetails({ open: false, parentData: null });
  };

  return {
    onClose,
    methods,
    handleSubmit,
    onSubmit,
    postAssetTypeStatus,
    patchAssetTypeStatus,
  };
}
