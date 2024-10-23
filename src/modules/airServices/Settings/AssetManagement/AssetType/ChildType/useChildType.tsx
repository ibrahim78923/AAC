import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  AssetFieldFormDefaultValues,
  AssetTypeFormValidationSchema,
} from '../AssetType.data';
import { useEffect } from 'react';
import { usePatchAssetTypeMutation } from '@/services/airServices/settings/asset-management/asset-type';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants/routes';

export default function useChildType({ childDetails, setChildDetails }: any) {
  const router: any = useRouter();

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
      id: childDetails?.parentData?._id,
    };
    try {
      const res: any = await patchChildAssetTypeTrigger(body)?.unwrap();
      successSnackbar('Asset Type Added Successfully!');
      onClose?.();
      router?.push({
        pathname: AIR_SERVICES?.ASSET_TYPE_CREATE_FIELDS,
        query: {
          section: res?.data?._id,
          childName: res?.data?.name,
        },
      });
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      onClose?.();
    }
  };

  const updateChildType = async (data: any) => {
    const body = {
      ...data,
      id: childDetails?.parentData?._id,
      chlidId: childDetails?.childData?._id,
    };
    try {
      const res: any = await patchChildAssetTypeTrigger(body)?.unwrap();
      successSnackbar('Asset Type Updated Successfully!');
      onClose?.();
      router?.push({
        pathname: AIR_SERVICES?.ASSET_TYPE_CREATE_FIELDS,
        query: {
          section: res?.data?._id,
          childName: res?.data?.name,
        },
      });
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      onClose?.();
    }
  };

  const onClose = () => {
    setChildDetails({
      open: false,
      parentData: null,
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
