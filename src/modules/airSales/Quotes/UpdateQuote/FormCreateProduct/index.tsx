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
import { useGetSalesProductlineItemQuery } from '@/services/airSales/quotes';
import {
  // useCreateAssociationQuoteMutation,
  // useGetProductCatagoriesQuery,
  // useGetQuoteByIdQuery,
  useLazyGetProductCatagoriesUpdatedQuery,
  useLazyGetProductsByIdQuery,
  usePostProductMutation,
  useUpdateProductByIdMutation,
} from '@/services/airSales/quotes';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { DRAWER_TYPES, NOTISTACK_VARIANTS } from '@/constants/strings';
import { PRODUCTS_TYPE } from '@/constants';
// import { NOTISTACK_VARIANTS } from '@/constants/strings';

const FormCreateProduct = ({ open, onClose }: any) => {
  const theme = useTheme();
  const params = useSearchParams();
  const actionType = params.get('type');
  const disableForm = actionType === 'view' ? true : false;
  // const quoteId = params.get('data');
  const productId = params.get('productId');

  const [postProduct, { isLoading: loadingProductPost }] =
    usePostProductMutation();

  const [updateProductById] = useUpdateProductByIdMutation();

  // const { data: Quotenew } = useGetQuoteByIdQuery({ id: quoteId });

  // console.log('Quotenew', Quotenew);

  // const { data: productCatagories } = useGetProductCatagoriesQuery({});
  const productCatagories = useLazyGetProductCatagoriesUpdatedQuery();

  const [lazyGetProductsByIdQuery] = useLazyGetProductsByIdQuery();

  // const [createAssociationQuote] = useCreateAssociationQuoteMutation();

  const methods: any = useForm({
    resolver: yupResolver(productsValidationSchema),
    defaultValues: async () => {
      return productDefaultValues;
    },
  });
  const { handleSubmit, reset, watch } = methods;

  const watchProduct = watch('productType');

  const onSubmit = async (values: any) => {
    values.category = values?.category?._id;
    const formData = new FormData();
    Object.entries(values)?.forEach(([key, value]: any) => {
      if (value !== undefined && value !== null && value !== '') {
        formData?.append(key, value);
      }
    });

    if (actionType === DRAWER_TYPES?.EDIT) {
      try {
        await updateProductById({ id: productId, body: formData })?.unwrap();
        // .then((res: any) => {
        //   const associationBody = {
        //     dealId: Quotenew?.data?.dealId,
        //     product: {
        //       productId: res?.data?._id,
        //       quantity: 1,
        //     },
        //   };
        //   createAssociationQuote({ body: associationBody })?.unwrap();
        //   enqueueSnackbar('Product Updated Successfully', {
        //     variant: NOTISTACK_VARIANTS?.SUCCESS,
        //   });
        // });
      } catch (err: any) {
        enqueueSnackbar('Error while edit product', {
          variant: NOTISTACK_VARIANTS?.ERROR,
        });
      }
    } else if (actionType === DRAWER_TYPES?.CREATE) {
      try {
        await postProduct({ body: formData })?.unwrap();
        // .then((res: any) => {
        //   const associationBody = {
        //     dealId: Quotenew?.data?.dealId,
        //     product: {
        //       productId: res?.data?._id,
        //       quantity: 1,
        //     },
        //   };
        //   createAssociationQuote({ body: associationBody })?.unwrap();
        //   enqueueSnackbar('Product added Successfully', {
        //     variant: NOTISTACK_VARIANTS?.SUCCESS,
        //   });
        //   reset();
        // });
      } catch (err: any) {
        enqueueSnackbar('Error while creating product', {
          variant: NOTISTACK_VARIANTS?.ERROR,
        });
      }
    }
    onClose();
  };

  useEffect(() => {
    if ((actionType === 'edit' || actionType === 'view') && productId) {
      lazyGetProductsByIdQuery({ id: productId }).then((res: any) => {
        if (res?.data) {
          const fieldsData = res?.data?.data;
          reset({
            name: fieldsData?.name || '',
            sku: fieldsData?.sku || '',
            category: fieldsData?.category || '',
            description: fieldsData?.description || '',
            isActive: fieldsData?.isActive || false,
            unitPrice: fieldsData?.unitPrice || null,
            purchasePrice: fieldsData?.purchasePrice || null,
          });
        }
      });
    } else {
      reset({
        name: '',
        sku: '',
        category: '',
        description: '',
        isActive: false,
        unitPrice: null,
        purchasePrice: null,
      });
    }
  }, [productId, actionType, reset, lazyGetProductsByIdQuery]);

  const { data: salesProducts } = useGetSalesProductlineItemQuery({});

  const extProductOptions = salesProducts?.data?.salesproducts?.map(
    (item: any) => ({
      value: item?._id,
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
          <Grid container spacing={'22px'}>
            <Grid item xs={12}>
              <RHFRadioGroup
                options={productRadioOptions}
                name="productType"
                label={false}
                defaultValue="new-products"
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
                  <span style={{ color: theme?.palette?.error?.main }}>*</span>
                </Typography>
                <RHFSearchableSelect
                  size="small"
                  name="chooseProduct"
                  options={extProductOptions}
                />
              </Grid>
            )}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

export default FormCreateProduct;
