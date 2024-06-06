import {
  salesProductDefaultValues,
  salesProductvalidationSchema,
} from './SalesEditorDrawer.data';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useLazyGetSalesProductByIdQuery,
  usePostSalesProductMutation,
  useUpdateSalesProductMutation,
} from '@/services/airSales/deals/settings/sales-product';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

import { useEffect } from 'react';
import { useLazyGetProductCategoriesQuery } from '@/services/common-APIs';

const useSalesEditorDrawer = ({
  selectedCheckboxes,
  isEditMode,
  setSelectedCheckboxes,
  setIsDraweropen,
}: any) => {
  const [postSalesProduct, { isLoading: productLoading }] =
    usePostSalesProductMutation();

  const [updateSalesProduct, { isLoading: updateProductLoading }] =
    useUpdateSalesProductMutation();

  const [getSalesProductById, { isLoading: productsDataLoading }] =
    useLazyGetSalesProductByIdQuery();

  const productCategories = useLazyGetProductCategoriesQuery();

  const salesProduct = useForm({
    resolver: yupResolver(salesProductvalidationSchema),
    defaultValues: salesProductDefaultValues,
  });
  const { handleSubmit, reset } = salesProduct;
  useEffect(() => {
    if (selectedCheckboxes?.length > 0 && isEditMode) {
      getSalesProductById(selectedCheckboxes)
        .unwrap()
        .then((res: any) => {
          if (res) {
            const fieldsData = res?.data;
            reset({
              name: fieldsData?.name,
              sku: fieldsData?.sku,
              purchasePrice: fieldsData?.purchasePrice,
              category: fieldsData?.category?._id,
              associate: fieldsData?.associate,
              description: fieldsData?.description,
              isActive: fieldsData?.isActive,
              unitPrice: fieldsData?.unitPrice,
            });
          }
        });
    }
  }, [selectedCheckboxes, reset]);

  const onSubmit = async (values: any) => {
    const formData = new FormData();
    values.removeImage = false;
    formData.append('category', values?.category?._id);
    formData.append('description', values?.description);
    formData.append('isActive', values?.isActive);
    formData.append('name', values?.name);
    formData.append('purchasePrice', values?.purchasePrice);
    formData.append('sku', values?.sku);
    formData.append('unitPrice', values?.unitPrice);
    formData.append('image', values?.image);
    formData.append('removeImage', values.removeImage);

    try {
      if (isEditMode) {
        await updateSalesProduct({
          body: formData,
          id: selectedCheckboxes,
        })?.unwrap();
      } else {
        await postSalesProduct({ body: formData })?.unwrap();
      }
      setSelectedCheckboxes([]),
        setIsDraweropen(false),
        enqueueSnackbar(
          `Product ${isEditMode ? 'Updated ' : 'Added'} Successfully`,
          { variant: NOTISTACK_VARIANTS?.SUCCESS },
        );
    } catch (error: any) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const handleUserSwitchChange = async (e: any, id: any) => {
    const status = e?.target?.checked;
    try {
      const formData: any = new FormData();
      formData.removeImage = false;
      formData.isActive = status;
      formData.append('isActive', formData.isActive);
      formData.append('removeImage', formData.removeImage);
      await updateSalesProduct({
        body: formData,
        id: id,
      })?.unwrap();
      enqueueSnackbar('Product updated successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: 'error',
      });
    }
  };

  return {
    handleUserSwitchChange,
    updateProductLoading,
    productsDataLoading,
    productCategories,
    productLoading,
    handleSubmit,
    salesProduct,
    onSubmit,
  };
};

export default useSalesEditorDrawer;
