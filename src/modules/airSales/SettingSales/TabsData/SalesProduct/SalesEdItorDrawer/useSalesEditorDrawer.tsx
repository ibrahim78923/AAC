import {
  salesProductDefaultValues,
  salesProductvalidationSchema,
} from './SalesEditorDrawer.data';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  usePostSalesProductMutation,
  useUpdateSalesProductMutation,
} from '@/services/airSales/deals/settings/sales-product';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useSalesEditorDrawer = ({
  selectedCheckboxes,
  isEditMode,
  setSelectedCheckboxes,
  setIsDraweropen,
}: any) => {
  const editRowValue = selectedCheckboxes && selectedCheckboxes[0];
  const [postSalesProduct] = usePostSalesProductMutation();
  const [updateSalesProduct] = useUpdateSalesProductMutation();

  const salesProduct = useForm({
    resolver: yupResolver(salesProductvalidationSchema),
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
      return salesProductDefaultValues;
    },
  });
  const { handleSubmit } = salesProduct;
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
      isEditMode === 'Edit'
        ? await updateSalesProduct({
            body: formData,
            id: editRowValue?._id,
          }).unwrap()
        : await postSalesProduct({ body: formData })?.unwrap();
      setSelectedCheckboxes([]);
      setIsDraweropen(false);
      enqueueSnackbar(
        `Product ${isEditMode ? 'Updated ' : 'Added'} Successfully`,
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
    } catch (error) {
      const errMsg = error?.data?.message;
      const errMessage = Array?.isArray(errMsg) ? errMsg[0] : errMsg;
      enqueueSnackbar(errMessage ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  return {
    handleSubmit,
    onSubmit,
    salesProduct,
  };
};

export default useSalesEditorDrawer;
