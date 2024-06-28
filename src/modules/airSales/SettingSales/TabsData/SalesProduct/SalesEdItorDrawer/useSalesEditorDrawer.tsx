import {
  salesProductDefaultValues,
  salesProductvalidationSchema,
} from './SalesEditorDrawer.data';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useGetSalesProductByIdQuery,
  usePostSalesProductMutation,
  useUpdateSalesProductMutation,
} from '@/services/airSales/deals/settings/sales-product';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

import { useEffect } from 'react';

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

  const { data: productUsersById, isLoading: productsDataLoading } =
    useGetSalesProductByIdQuery(selectedCheckboxes);

  const salesProduct = useForm({
    resolver: yupResolver(salesProductvalidationSchema),
    defaultValues: salesProductDefaultValues,
  });
  const { handleSubmit, setValue } = salesProduct;

  useEffect(() => {
    {
      if (isEditMode) {
        const data = productUsersById?.data;
        const fieldsToSet: any = {
          name: data?.name,
          sku: data?.sku,
          purchasePrice: data?.purchasePrice,
          category: data?.category?._id,
          associate: data?.associate,
          description: data?.description,
          isActive: data?.isActive,
          unitPrice: data?.unitPrice,
        };
        for (const key in fieldsToSet) {
          setValue(key, fieldsToSet[key]);
        }
      }
    }
  }, [productUsersById]);

  const onSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append('category', values?.category?._id);
    formData.append('description', values?.description);
    formData.append('isActive', values?.isActive);
    formData.append('name', values?.name);
    formData.append('purchasePrice', values?.purchasePrice);
    formData.append('sku', values?.sku);
    formData.append('unitPrice', values?.unitPrice);
    formData.append('image', values?.image);
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
    productLoading,
    handleSubmit,
    salesProduct,
    onSubmit,
  };
};

export default useSalesEditorDrawer;
