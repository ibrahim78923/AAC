import {
  addAssetDefaultValues,
  addAssetValidationSchema,
} from './AddAsset.data';
import { usePostAssociatedAssetMutation } from '@/services/airServices/settings/asset-management/product-catalog';
import { useRouter } from 'next/router';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useFormLib } from '@/hooks/useFormLib';

export const useAddAsset = (setAddModalOpen: any) => {
  const router: any = useRouter();
  const { productCatalogId } = router?.query;

  const { methods, handleSubmit } = useFormLib({
    validationSchema: addAssetValidationSchema,
    defaultValues: addAssetDefaultValues,
  });

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
      await postAssociatedAssetTrigger(postAssociatedAssetParameter)?.unwrap();
      setAddModalOpen?.(false);
      successSnackbar('Associated Asset Added Successfully!');
    } catch (error: any) {
      setAddModalOpen?.(false);
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    postAssociatedAssetStatus,
  };
};
