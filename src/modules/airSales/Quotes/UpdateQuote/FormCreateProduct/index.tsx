import { Grid, Box, Typography, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import {
  FormProvider,
  RHFRadioGroup,
  RHFSearchableSelect,
} from '@/components/ReactHookForm';
import { yupResolver } from '@hookform/resolvers/yup';
import CommonDrawer from '@/components/CommonDrawer';
import {
  addContactFields,
  productsValidationSchema,
  productDefaultValues,
  productRadioOptions,
} from './FormCreateProduct.data';
import {
  useGetSalesProductlineItemQuery,
  usePutSubmitQuoteMutation,
} from '@/services/airSales/quotes';
import {
  useLazyGetProductCatagoriesUpdatedQuery,
  useGetProductsByIdQuery,
  usePostProductMutation,
} from '@/services/airSales/quotes';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { DRAWER_TYPES, NOTISTACK_VARIANTS } from '@/constants/strings';
import { PRODUCTS_TYPE } from '@/constants';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

const FormCreateProduct = (props: any) => {
  const { open, onClose, productsArray, dataGetQuoteById } = props;
  const theme = useTheme();
  const params = useSearchParams();
  const actionType = params.get('type');
  const disableForm = actionType === DRAWER_TYPES?.VIEW ? true : false;
  const productId = params.get('productId');

  const [postProduct, { isLoading: loadingProductPost }] =
    usePostProductMutation();

  const productCatagories = useLazyGetProductCatagoriesUpdatedQuery();
  const [putSubmitQuote] = usePutSubmitQuoteMutation();

  const { data: productByIdData, isLoading: productByIdLoading } =
    useGetProductsByIdQuery({ id: productId }, { skip: !productId });

  const methods: any = useForm({
    resolver: yupResolver(productsValidationSchema),
    defaultValues: async () => {
      return productDefaultValues;
    },
  });
  const { handleSubmit, reset, watch } = methods;

  const watchProduct = watch('productType');
  const existingProductDetail = watch('chooseProduct');

  const onSubmit = async (values: any) => {
    try {
      delete values.productType;
      const formData = new FormData();

      Object?.entries(values)?.forEach(([key, value]: any) => {
        if (value !== undefined && value !== null && value !== '') {
          if (key === PRODUCTS_TYPE?.EXT_PRODUCT) {
            return;
          } else if (key === 'category') {
            formData?.append(key, value?._id);
          } else if (key === 'image') {
            formData?.append(key, value);
          } else {
            formData?.append(key, value);
          }
        }
      });

      if (
        actionType === DRAWER_TYPES?.CREATE &&
        watchProduct === PRODUCTS_TYPE?.NEW_PRODUCT
      ) {
        const res: any = await postProduct({ body: formData })?.unwrap();

        if (res) {
          const productRespParams = {
            name: res?.data?.name,
            sku: res?.data?.sku,
            productId: res?.data?._id,
            quantity: 0,
            additionalQuantity: 0,
            unitDiscount: 0,
            purchasePrice: res?.data?.purchasePrice,
            unitPrice: res?.data?.unitPrice,
            category: res?.data?.category?._id,
            additionalProductPriceSum: 0,
          };

          const submitQuotesPayload = {
            id: dataGetQuoteById?.data?._id,
            status: 'DRAFT',
            products: [...productsArray, productRespParams],
            dealAmount: dataGetQuoteById?.data?.dealAmount,
          };

          await putSubmitQuote({ body: submitQuotesPayload })?.unwrap();
          enqueueSnackbar('Product added Successfully', {
            variant: NOTISTACK_VARIANTS?.SUCCESS,
          });
          onClose();
          reset();
        }
      } else {
        const productRespParams = {
          name: existingProductDetail?.name,
          sku: existingProductDetail?.sku,
          productId: existingProductDetail?._id,
          quantity: 0,
          additionalQuantity: 0,
          unitDiscount: 0,
          purchasePrice: existingProductDetail?.purchasePrice,
          unitPrice: existingProductDetail?.unitPrice,
          category: existingProductDetail?.category?._id,
          additionalProductPriceSum: 0,
        };

        const submitQuotesPayload = {
          id: dataGetQuoteById?.data?._id,
          status: 'DRAFT',
          products: [...productsArray, productRespParams],
          dealAmount: dataGetQuoteById?.data?.dealAmount,
        };

        await putSubmitQuote({ body: submitQuotesPayload })?.unwrap();
        enqueueSnackbar('Product added Successfully', {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        });
        onClose();
        reset();
      }
    } catch (err: any) {
      enqueueSnackbar('Error while creating product', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  useEffect(() => {
    if (actionType === 'view') {
      if (productByIdData?.data) {
        const fieldsData = productByIdData?.data;
        reset({
          productType: PRODUCTS_TYPE?.NEW_PRODUCT,
          name: fieldsData?.name || '',
          sku: fieldsData?.sku || '',
          category: fieldsData?.category || '',
          description: fieldsData?.description || '',
          isActive: fieldsData?.isActive || false,
          unitPrice: fieldsData?.unitPrice || null,
          purchasePrice: fieldsData?.purchasePrice || null,
        });
      }
    } else {
      reset({
        productType: PRODUCTS_TYPE?.NEW_PRODUCT,
        name: '',
        purchasePrice: '',
        unitPrice: '',
        sku: '',
        category: null,
        description: '',
        isActive: false,
        image: '',
      });
    }
  }, [productId, actionType, reset, productByIdData?.data]);

  const { data: salesProducts } = useGetSalesProductlineItemQuery({});

  const extProductOptions = salesProducts?.data?.salesproducts?.map(
    (item: any) => ({
      value: item,
      label: item?.name ? item?.name : 'N/A',
    }),
  );

  return (
    <CommonDrawer
      title={`${actionType} Product`}
      okText="Save"
      isDrawerOpen={open}
      onClose={onClose}
      isOk
      cancelText={'Cancel'}
      footer={actionType === 'view' ? false : true}
      submitHandler={handleSubmit(onSubmit)}
      isLoading={loadingProductPost}
    >
      <Box sx={{ pt: '27px' }}>
        <FormProvider methods={methods}>
          {productByIdLoading ? (
            <SkeletonTable />
          ) : (
            <Grid container spacing={'22px'}>
              <Grid item xs={12}>
                <RHFRadioGroup
                  options={productRadioOptions}
                  name="productType"
                  label={false}
                  defaultValue="new-products"
                  disabled={disableForm}
                />
              </Grid>
              {watchProduct === PRODUCTS_TYPE?.NEW_PRODUCT ? (
                addContactFields(productCatagories)?.map((item: any) => (
                  <Grid item xs={12} key={item?.componentProps?.name}>
                    <item.component
                      disabled={disableForm}
                      {...item?.componentProps}
                      size={'small'}
                    >
                      {item?.componentProps?.select &&
                        item?.options?.map((option: any) => (
                          <option key={option?.value} value={option?.value}>
                            {option?.label}
                          </option>
                        ))}
                    </item.component>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    color={theme?.palette?.grey[600]}
                  >
                    Choose Product{' '}
                    <span style={{ color: theme?.palette?.error?.main }}>
                      *
                    </span>
                  </Typography>
                  <RHFSearchableSelect
                    size="small"
                    name="chooseProduct"
                    options={extProductOptions}
                  />
                </Grid>
              )}
            </Grid>
          )}
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

export default FormCreateProduct;
