import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  productsDefaultValues,
  productsValidationSchema,
} from './ProductEditorDrawer.data';
import { usePostSalesProductMutation } from '@/services/airSales/deals/settings/sales-product';
import { enqueueSnackbar } from 'notistack';
import {
  NOTISTACK_VARIANTS,
  ROLES_ACTION_CONSTANTS,
} from '@/constants/strings';
import { ASSOCIATIONS_API_PARAMS_FOR, PRODUCTS_TYPE } from '@/constants';
import { usePostAssociationCompaniesMutation } from '@/services/commonFeatures/companies';
import { useTheme } from '@mui/material';
import { useLazyGetProductCategoriesQuery } from '@/services/common-APIs';
import { useGetSalesProductlineItemQuery } from '@/services/airSales/quotes';
import { useCreateAssociationMutation } from '@/services/airSales/deals/view-details/association';

const useProductsEditorDrawer = ({
  selectedProduct,
  openDrawer,
  setOpenDrawer,
  dealId,
}: any) => {
  const theme = useTheme();

  const [postSalesProduct, { isLoading: addProductLoading }] =
    usePostSalesProductMutation();
  const [postAssociation, { isLoading: postAssociationLoading }] =
    usePostAssociationCompaniesMutation();

  const [createAssociation, { isLoading: associationLoading }] =
    useCreateAssociationMutation();
  const productCategories = useLazyGetProductCategoriesQuery();

  const methodsProducts = useForm({
    resolver: yupResolver<any>(productsValidationSchema),
    defaultValues: async () => {
      if (openDrawer !== ROLES_ACTION_CONSTANTS?.ADD && selectedProduct) {
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
          productType: 'new-products',
          name,
          sku,
          purchasePrice: purchasePrice || null,
          category: category?._id,
          description,
          isActive,
          unitPrice: unitPrice || null,
          file,
        };
      }
      return productsDefaultValues;
    },
  });

  const { handleSubmit, watch } = methodsProducts;

  const watchProduct = watch('productType');

  const onSubmit = async (values: any) => {
    delete values.productType;
    const formData = new FormData();

    Object.entries(values)?.forEach(([key, value]: any) => {
      if (value !== undefined && value !== null && value !== '') {
        if (key === PRODUCTS_TYPE?.EXT_PRODUCT) {
          return;
        } else if (key === 'category') {
          formData.append(key, value?._id);
        } else {
          formData.append(key, value);
        }
      }
    });

    try {
      watchProduct === PRODUCTS_TYPE?.EXT_PRODUCT
        ? await createAssociation({
            body: {
              dealId: dealId,
              product: [{ productId: values?.chooseProduct }],
            },
          })
            ?.unwrap()
            ?.then((res: any) => {
              if (res) {
                setOpenDrawer(false);
                enqueueSnackbar(` Companies updated Successfully`, {
                  variant: NOTISTACK_VARIANTS?.SUCCESS,
                });
              }
            })
        : await postSalesProduct({ body: formData })
            ?.unwrap()
            ?.then((response: any) => {
              if (response?.data) {
                try {
                  const associationPayload = {
                    recordId: dealId,
                    recordType: ASSOCIATIONS_API_PARAMS_FOR?.DEALS,
                    operation: ASSOCIATIONS_API_PARAMS_FOR?.ADD,
                    products: [{ productId: response?.data?._id }],
                  };
                  postAssociation({ body: associationPayload })?.unwrap();
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
            });
    } catch (error: any) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  const { data: salesProducts } = useGetSalesProductlineItemQuery({});

  const extProductOptions = salesProducts?.data?.salesproducts?.map(
    (item: any) => ({
      value: item?._id,
      label: item?.name ? item?.name : 'N/A',
    }),
  );

  return {
    postAssociationLoading,
    addProductLoading,
    methodsProducts,
    watchProduct,
    handleSubmit,
    onSubmit,
    theme,
    productCategories,
    extProductOptions,
    associationLoading,
  };
};

export default useProductsEditorDrawer;
