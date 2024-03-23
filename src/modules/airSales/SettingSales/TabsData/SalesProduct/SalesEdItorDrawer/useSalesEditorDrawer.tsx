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
import { Skeleton } from '@mui/material';

const useSalesEditorDrawer = ({
  selectedCheckboxes,
  isEditMode,
  setSelectedCheckboxes,
  setIsDraweropen,
}: any) => {
  const [postSalesProduct, { isLoading: productLoading }] =
    usePostSalesProductMutation();

  const [updateSalesProduct] = useUpdateSalesProductMutation();
  const [getSalesProductById, { isLoading: productsDataLoading }] =
    useLazyGetSalesProductByIdQuery();

  const salesProduct = useForm({
    resolver: yupResolver(salesProductvalidationSchema),
    defaultValues: salesProductDefaultValues,
  });
  const { handleSubmit, reset } = salesProduct;

  useEffect(() => {
    if (selectedCheckboxes?.length > 0 && isEditMode) {
      getSalesProductById(selectedCheckboxes)
        .unwrap()
        .then((res) => {
          if (res) {
            const fieldsData = res?.data;
            reset({
              name: fieldsData?.name,
              sku: fieldsData?.sku,
              purchasePrice: fieldsData?.purchasePrice,
              category: fieldsData?.category,
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

    formData.append('category', values?.category);
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
          {
            variant: NOTISTACK_VARIANTS?.SUCCESS,
          },
        );
      // isEditMode ? await updateSalesProduct({ body: formData, id: selectedCheckboxes })?.unwrap() :
      //   await postSalesProduct({ body: formData })?.unwrap(),
      //   setSelectedCheckboxes([]),
      //   setIsDraweropen(false),
      //   enqueueSnackbar(
      //     `Product ${isEditMode ? 'Updated ' : 'Added'} Successfully`,
      //     {
      //       variant: NOTISTACK_VARIANTS?.SUCCESS,
      //     },
      //   );
    } catch (error: any) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const skeletonLines = [];
  for (let i = 0; i < 5; i++) {
    skeletonLines.push(
      <Skeleton key={i} animation="wave" height={60} sx={{ mb: 1 }} />,
    );
  }

  return {
    handleSubmit,
    onSubmit,
    salesProduct,
    productLoading,
    productsDataLoading,
    skeletonLines,
  };
};

export default useSalesEditorDrawer;
