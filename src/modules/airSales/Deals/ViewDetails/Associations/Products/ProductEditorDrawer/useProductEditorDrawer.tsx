import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  productsDefaultValues,
  productsValidationSchema,
} from './ProductEditorDrawer.data';
import {
  usePostSalesProductMutation,
  useUpdateSalesProductMutation,
} from '@/services/airSales/deals/settings/sales-product';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useProductsEditorDrawer = ({ selectedCheckboxes, openDrawer }: any) => {
  const editRowValue = selectedCheckboxes && selectedCheckboxes;
  const [postSalesProduct] = usePostSalesProductMutation();
  const [updateSalesProduct] = useUpdateSalesProductMutation();
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
          fileUrl,
          // createdBy,
          unitPrice,
          note,
        } = editRowValue;
        return {
          name,
          sku,
          purchasePrice,
          category,
          description,
          associate,
          isActive,
          fileUrl,
          // createdBy: new Date(createdBy),
          unitPrice,
          note,
        };
      }
      return productsDefaultValues;
    },
  });

  const onSubmit = async (values: any) => {
    const formData = new FormData();

    formData.append('category', values?.category);
    formData.append('description', values?.description);
    formData.append('isActive', values?.isActive);
    formData.append('name', values?.name);
    formData.append('purchasePrice', values?.purchasePrice);
    formData.append('sku', values?.sku);
    formData.append('unitPrice', values?.unitPrice);
    formData.append('file', values?.file);

    try {
      openDrawer === 'Edit'
        ? await updateSalesProduct({
            body: formData,
            id: editRowValue?._id,
          }).unwrap()
        : await postSalesProduct({ body: formData })?.unwrap();
    } catch (error) {
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
  };
};

export default useProductsEditorDrawer;
