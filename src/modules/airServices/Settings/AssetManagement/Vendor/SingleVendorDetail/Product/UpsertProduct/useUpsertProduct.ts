import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import {
  upsertProductValidationSchema,
  upsertProductDefaultValues,
  upsertProductDataArray,
} from './UpsertProduct.data';
import { useEffect, useState } from 'react';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  useLazyGetProductVendorDropdownQuery,
  usePostProductVendorMutation,
  usePutProductVendorMutation,
} from '@/services/airServices/settings/asset-management/vendor/single-vendor-details/product';
import { useRouter } from 'next/router';

export const useUpsertProduct = (props: any) => {
  const { setUpsertProductModal, editData, setEditData } = props;
  const router = useRouter();
  const { vendorId } = router?.query;
  const [catalogId, setCatalogId] = useState();

  const methods: any = useForm<any>({
    resolver: yupResolver(upsertProductValidationSchema),
    defaultValues: upsertProductDefaultValues(),
  });
  const { handleSubmit, reset } = methods;

  const [postProductVendorTrigger, postProductVendorProgress] =
    usePostProductVendorMutation();
  const [putProductVendorTrigger, putProductVendorProgress] =
    usePutProductVendorMutation();
  const dropdownData = useLazyGetProductVendorDropdownQuery();

  const isLoading = postProductVendorProgress?.isLoading;
  const isEditLoading = putProductVendorProgress?.isLoading;
  const upsertProductFields = upsertProductDataArray(dropdownData, editData);

  const isSubmit = async (data: any) => {
    const productVendorData = {
      vendorId: vendorId,
      productCatalogId: data?.productCatalog?._id,
      price: data?.price,
      yrs: data?.years,
      months: data?.months,
      quantity: data?.quantity,
    };
    setCatalogId(data?.productCatalog?._id);
    try {
      const res: any =
        await postProductVendorTrigger(productVendorData)?.unwrap();
      enqueueSnackbar(res?.message ?? 'Product Added Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Something went wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
    setUpsertProductModal(false);
    setEditData([]);
    reset(upsertProductDefaultValues());
  };

  const editSubmit = async (data: any) => {
    const productVendorData = {
      id: editData?._id,
      vendorId: vendorId,
      price: data?.price,
      yrs: data?.years,
      months: data?.months,
      quantity: data?.quantity,
    };
    try {
      const res: any =
        await putProductVendorTrigger(productVendorData)?.unwrap();
      enqueueSnackbar(res?.message ?? 'Product Edit Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Something went wrong!', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
    setUpsertProductModal(false);
    setEditData([]);
    reset(upsertProductDefaultValues());
  };

  useEffect(() => {
    reset(() => upsertProductDefaultValues(editData));
  }, [editData, reset]);

  const handleCancel = () => {
    setUpsertProductModal(false);
    setEditData([]);
  };
  return {
    methods,
    handleSubmit,
    isSubmit,
    editSubmit,
    handleCancel,
    isLoading,
    isEditLoading,
    catalogId,
    upsertProductFields,
  };
};
