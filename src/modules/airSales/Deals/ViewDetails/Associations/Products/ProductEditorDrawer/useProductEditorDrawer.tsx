import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  productsDefaultValues,
  productsValidationSchema,
} from './ProductEditorDrawer.data';
import { usePostSalesProductMutation } from '@/services/airSales/deals/settings/sales-product';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useCreateAssociationMutation } from '@/services/airSales/deals/view-details/association';

const useProductsEditorDrawer = ({
  selectedCheckboxes,
  setOpenDrawer,
  dealId,
}: any) => {
  const editRowValue = selectedCheckboxes && selectedCheckboxes;
  const [postSalesProduct, { isLoading: addProductLoading }] =
    usePostSalesProductMutation();
  const [createAssociation] = useCreateAssociationMutation();

  const methodsProducts = useForm({
    resolver: yupResolver(productsValidationSchema),
    defaultValues: async () => {
      if (editRowValue) {
        const {
          name,
          sku,
          purchasePrice,
          category,
          associate,
          description,
          isActive,
          unitPrice,
        } = editRowValue;
        return {
          name,
          sku,
          purchasePrice,
          category,
          description,
          associate,
          isActive,
          unitPrice,
        };
      }
      return productsDefaultValues;
    },
  });

  const onSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append('name', values?.name);
    formData.append('sku', values?.sku);
    formData.append('purchasePrice', values?.purchasePrice);
    formData.append('category', values?.category);
    formData.append('description', values?.description);
    formData.append('unitPrice', values?.unitPrice);
    formData.append('isActive', values?.isActive);
    formData.append('image', values?.file);

    try {
      const response = await postSalesProduct({ body: formData })?.unwrap();
      setOpenDrawer('');
      if (response?.data) {
        try {
          await createAssociation({
            body: {
              dealId: dealId,
              product: { productId: response?.data?._id },
            },
          }).unwrap();
          enqueueSnackbar(` Product Added Successfully`, {
            variant: NOTISTACK_VARIANTS?.SUCCESS,
          });
        } catch (error: any) {
          const errMsg = error?.data?.message;
          enqueueSnackbar(errMsg ?? 'Error occurred', {
            variant: NOTISTACK_VARIANTS?.ERROR,
          });
        }
      }
    } catch (error: any) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  const { handleSubmit } = methodsProducts;

  return {
    handleSubmit,
    onSubmit,
    methodsProducts,
    addProductLoading,
  };
};

export default useProductsEditorDrawer;
