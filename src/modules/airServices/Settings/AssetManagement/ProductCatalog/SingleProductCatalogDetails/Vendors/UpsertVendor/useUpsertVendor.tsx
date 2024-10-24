import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  getUpsertVendorDataArray,
  upsertVendorDefaultValues,
  upsertVendorValidationSchema,
} from './UpsertVendor.data';
import {
  usePatchVendorMutation,
  usePostVendorMutation,
} from '@/services/airServices/settings/asset-management/product-catalog';
import { useRouter } from 'next/router';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

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

  const upsertVendorDataArray = getUpsertVendorDataArray();

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
      await postVendorTrigger(postVendorParameter)?.unwrap();
      setIsUpsertModalOpen?.(false);
      successSnackbar(
        `Vendor ${isUpsertModalOpen?.id ? 'Updated' : 'Added'} Successfully!`,
      );
    } catch (error: any) {
      setIsUpsertModalOpen?.(false);
      errorSnackbar(error?.data?.message);
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
      await patchVendorTrigger(patchVendorParameter)?.unwrap();
      setIsUpsertModalOpen?.(false);
      successSnackbar(
        `Vendor ${isUpsertModalOpen?.id ? 'Updated' : 'Added'} Successfully!`,
      );
    } catch (error: any) {
      setIsUpsertModalOpen?.(false);
      errorSnackbar(error?.data?.message);
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
