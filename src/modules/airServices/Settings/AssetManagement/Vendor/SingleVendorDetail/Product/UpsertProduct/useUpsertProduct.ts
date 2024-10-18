import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  upsertProductValidationSchema,
  upsertProductDefaultValues,
  upsertProductDataArray,
} from './UpsertProduct.data';
import { useEffect, useState } from 'react';
import {
  usePostProductVendorMutation,
  usePutProductVendorMutation,
} from '@/services/airServices/settings/asset-management/vendor/single-vendor-details/product';
import { useRouter } from 'next/router';
import { errorSnackbar, successSnackbar } from '@/utils/api';

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

  const upsertProductFields = upsertProductDataArray(editData);

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
      successSnackbar(res?.message ?? 'Product Added Successfully');
      setUpsertProductModal(false);
      setEditData([]);
      reset(upsertProductDefaultValues());
    } catch (error: any) {
      setUpsertProductModal(false);
      errorSnackbar(error?.data?.message);
    }
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
      successSnackbar(res?.message ?? 'Product Edit Successfully');
      setUpsertProductModal(false);
      setEditData([]);
      reset(upsertProductDefaultValues());
    } catch (error: any) {
      setUpsertProductModal(false);
      errorSnackbar(error?.data?.message);
    }
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
    catalogId,
    upsertProductFields,
    putProductVendorProgress,
    postProductVendorProgress,
  };
};
