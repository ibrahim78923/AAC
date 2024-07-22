import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  productsDefaultValues,
  productsValidationSchema,
} from './ProductEditorDrawer.data';
import { usePostSalesProductMutation } from '@/services/airSales/deals/settings/sales-product';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { ASSOCIATIONS_API_PARAMS_FOR } from '@/constants';
import { usePostAssociationCompaniesMutation } from '@/services/commonFeatures/companies';

const useProductsEditorDrawer = ({
  selectedProduct,
  openDrawer,
  setOpenDrawer,
  dealId,
}: any) => {
  const [postSalesProduct, { isLoading: addProductLoading }] =
    usePostSalesProductMutation();
  const [postAssociation, { isLoading: postAssociationLoading }] =
    usePostAssociationCompaniesMutation();

  const methodsProducts = useForm({
    resolver: yupResolver<any>(productsValidationSchema),
    defaultValues: async () => {
      if (openDrawer !== 'Add' && selectedProduct) {
        const {
          name,
          sku,
          purchasePrice,
          category,
          description,
          isActive,
          unitPrice,
          file,
        } = selectedProduct;

        return {
          name,
          sku,
          purchasePrice: purchasePrice || null,
          category,
          description,
          isActive,
          unitPrice: unitPrice || null,
          file,
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
    formData.append('category', values?.category?._id);
    formData.append('description', values?.description);
    formData.append('unitPrice', values?.unitPrice);
    formData.append('isActive', values?.isActive);
    formData.append('image', values?.file);

    try {
      const response = await postSalesProduct({ body: formData })?.unwrap();
      if (response?.data) {
        try {
          const associationPayload = {
            recordId: dealId,
            recordType: ASSOCIATIONS_API_PARAMS_FOR?.DEALS,
            operation: ASSOCIATIONS_API_PARAMS_FOR?.ADD,
            products: [{ productId: response?.data?._id }],
          };
          await postAssociation({ body: associationPayload })?.unwrap();
          enqueueSnackbar(` Product Added Successfully`, {
            variant: NOTISTACK_VARIANTS?.SUCCESS,
          });
          setOpenDrawer('');
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
    postAssociationLoading,
  };
};

export default useProductsEditorDrawer;
