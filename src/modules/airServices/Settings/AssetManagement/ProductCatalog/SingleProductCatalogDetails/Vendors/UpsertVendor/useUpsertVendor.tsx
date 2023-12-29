import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import {
  getUpsertVendorDataArray,
  upsertVendorDefaultValues,
  upsertVendorValidationSchema,
} from './UpsertVendor.data';
import {
  useLazyGetVendorsCatalogQuery,
  usePatchVendorMutation,
  usePostVendorMutation,
} from '@/services/airServices/settings/asset-management/product-catalog';
import { useRouter } from 'next/router';

export const useUpsertVendor = (
  setIsUpsertModalOpen: any,
  isUpsertModalOpen: any,
) => {
  const router: any = useRouter();
  const { productCatalogId } = router?.query;

  const methods: any = useForm({
    resolver: yupResolver(upsertVendorValidationSchema),
    defaultValues: upsertVendorDefaultValues(isUpsertModalOpen?.data),
  });

  const { handleSubmit } = methods;

  const apiQueryVendorsList = useLazyGetVendorsCatalogQuery();

  const upsertVendorDataArray = getUpsertVendorDataArray(apiQueryVendorsList);

  const [postVendorTrigger, postVendorStatus] = usePostVendorMutation();

  const onSubmit = async (data: any) => {
    const body = {
      vendorId: data?.vendorCatalog?._id,
      productCatalogId: productCatalogId,
      price: data?.price,
      yrs: data?.warrantyValidityYrs,
      months: data?.warrantyValidityMonths,
      quantity: data?.quantity,
    };

    if (!!isUpsertModalOpen?.data?._id) {
      submitUpdateVendor(data);
      return;
    }

    const postVendorParameter = { body };

    try {
      const response: any =
        await postVendorTrigger(postVendorParameter)?.unwrap();
      setIsUpsertModalOpen?.(false);
      enqueueSnackbar(
        response?.message ??
          `Vendor ${isUpsertModalOpen?.id ? 'Updated' : 'Added'} Successfully!`,
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
    } catch (error: any) {
      setIsUpsertModalOpen?.(false);
      enqueueSnackbar(error?.data?.message?.[0] ?? 'Something Went Wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const [patchVendorTrigger, patchVendorStatus] = usePatchVendorMutation();

  const submitUpdateVendor = async (data: any) => {
    const body = {
      id: isUpsertModalOpen?.data?._id,
      vendorId: data?.vendorCatalog?._id,
      price: data?.price,
      yrs: data?.warrantyValidityYrs,
      months: data?.warrantyValidityMonths,
      quantity: data?.quantity,
    };

    const patchVendorParameter = { body };

    try {
      const response: any =
        await patchVendorTrigger(patchVendorParameter)?.unwrap();
      setIsUpsertModalOpen?.(false);
      enqueueSnackbar(
        response?.message ??
          `Vendor ${isUpsertModalOpen?.id ? 'Updated' : 'Added'} Successfully!`,
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
    } catch (error: any) {
      setIsUpsertModalOpen?.(false);
      enqueueSnackbar(error?.data?.message?.[0] ?? 'Something Went Wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
    upsertVendorDataArray,
    postVendorStatus,
    patchVendorStatus,
  };
};
