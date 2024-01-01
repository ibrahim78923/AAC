import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  addAssetDefaultValues,
  addAssetValidationSchema,
} from './AddAsset.data';
import { usePostAssociatedAssetMutation } from '@/services/airServices/settings/asset-management/product-catalog';
import { useRouter } from 'next/router';

export const useAddAsset = (setAddModalOpen: any) => {
  const router: any = useRouter();
  const { productCatalogId } = router?.query;

  const methods: any = useForm({
    resolver: yupResolver(addAssetValidationSchema),
    defaultValues: addAssetDefaultValues,
  });

  const { handleSubmit } = methods;

  const [postAssociatedAssetTrigger, postAssociatedAssetStatus] =
    usePostAssociatedAssetMutation();

  const onSubmit = async (data: any) => {
    const postAssociatedAssetParameter = {
      body: {
        ...data,
        id: productCatalogId,
      },
    };

    try {
      const response: any = await postAssociatedAssetTrigger(
        postAssociatedAssetParameter,
      )?.unwrap();
      setAddModalOpen?.(false);
      enqueueSnackbar(
        response?.message ?? `Associated Asset Added Successfully!`,
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
    } catch (error: any) {
      setAddModalOpen?.(false);
      enqueueSnackbar(error?.data?.message?.[0] ?? 'Something Went Wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    postAssociatedAssetStatus,
  };
};
