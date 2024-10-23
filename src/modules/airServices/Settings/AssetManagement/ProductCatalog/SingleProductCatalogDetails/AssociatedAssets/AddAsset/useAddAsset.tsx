import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  addAssetDefaultValues,
  addAssetValidationSchema,
} from './AddAsset.data';
import { usePostAssociatedAssetMutation } from '@/services/airServices/settings/asset-management/product-catalog';
import { useRouter } from 'next/router';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

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
