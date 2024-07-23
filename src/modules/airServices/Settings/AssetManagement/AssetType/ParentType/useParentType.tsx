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
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';

export default function useParentType({
  parentDetails,
  setParentDetails,
}: any) {
  const router: any = useRouter();

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
      const res: any = await postAssetTypeTrigger(data);
      successSnackbar('Asset Type Added Successfully!');
      onClose?.();
      router?.push({
        pathname: AIR_SERVICES?.ASSET_TYPE_CREATE_FIELDS,
        query: {
          section: res?.data?.data?._id,
          parentName: res?.data?.data?.name,
        },
      });
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
      const res: any = await patchAssetTypeTrigger(body);
      successSnackbar('Asset Type Updated Successfully!');
      onClose?.();
      router?.push({
        pathname: AIR_SERVICES?.ASSET_TYPE_CREATE_FIELDS,
        query: {
          section: res?.data?.data?._id,
          parentName: res?.data?.data?.name,
        },
      });
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
