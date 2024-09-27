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
  // useUpdateProductByIdMutation,
} from '@/services/airSales/quotes';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { DRAWER_TYPES, NOTISTACK_VARIANTS } from '@/constants/strings';
import { PRODUCTS_TYPE } from '@/constants';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

const FormCreateProduct = (props: any) => {
  const { open, onClose, productsArray, setProductsArray, dataGetQuoteById } =
    props;
  const theme = useTheme();
  const params = useSearchParams();
  const actionType = params.get('type');
  const disableForm = actionType === DRAWER_TYPES?.VIEW ? true : false;
  const productId = params.get('productId');

  const [postProduct, { isLoading: loadingProductPost }] =
    usePostProductMutation();

  // const [updateProductById] = useUpdateProductByIdMutation();
  const productCatagories = useLazyGetProductCatagoriesUpdatedQuery();
  const [putSubmitQuote] = usePutSubmitQuoteMutation();

  const { data: productByIdData, isLoading: productByIdLoading } =
    useGetProductsByIdQuery({ id: productId }, { skip: !productId });

  // const [createAssociationQuote] = useCreateAssociationQuoteMutation();

  const methods: any = useForm({
    resolver: yupResolver(productsValidationSchema),
    defaultValues: async () => {
      return productDefaultValues;
    },
  });
  const { handleSubmit, reset, watch } = methods;

  const watchProduct = watch('productType');
  // need after some time

  // const onSubmit = async (values: any) => {
  //   delete values.productType;
  //   values.category = values?.category?._id;
  //   const formData = new FormData();
  //   Object.entries(values)?.forEach(([key, value]: any) => {
  //     if (value !== undefined && value !== null && value !== '') {
  //       formData?.append(key, value);
  //     }
  //   });

  //   if (actionType === DRAWER_TYPES?.EDIT) {
  //     try {
  //       await updateProductById({ id: productId, body: formData })?.unwrap()
  //       // .then((res: any) => {
  //       //   const associationBody = {
  //       //     dealId: Quotenew?.data?.dealId,
  //       //     product: {
  //       //       productId: res?.data?._id,
  //       //       quantity: 1,
  //       //     },
  //       //   };
  //       //   createAssociationQuote({ body: associationBody })?.unwrap();
  //       //   enqueueSnackbar('Product Updated Successfully', {
  //       //     variant: NOTISTACK_VARIANTS?.SUCCESS,
  //       //   });
  //       // });
  //     } catch (err: any) {
  //       enqueueSnackbar('Error while edit product', {
  //         variant: NOTISTACK_VARIANTS?.ERROR,
  //       });
  //     }
  //   } else if (actionType === DRAWER_TYPES?.CREATE) {
  //     try {
  //       const res:any = postProduct({ body: formData });
  //       res.data.additionalQuantity = 0;
  //       res.data.unitDiscount = 0;
  //       console.log(res?.data, 'res?.data');

  //       // setProductsArray([...productsArray, res?.data]);
  //       // const submitQuotesPayload = {
  //       //   id: dataGetQuoteById?.data?._id,
  //       //   status: 'DRAFT',
  //       //   products: [...productsArray, res?.data],
  //       //   dealAmount: dataGetQuoteById?.data?.dealAmount,
  //       //   subTotal: 0,
  //       //   invoiceDiscount: 0,
  //       //   RedeemedDiscount: 0,
  //       //   tax: 0,
  //       //   total: 0
  //       // }
  //       // console.log('submitQuotesPayload', submitQuotesPayload);

  //       // putSubmitQuote({ body: submitQuotesPayload })?.unwrap();
  //       // enqueueSnackbar('Product added Successfully', {
  //       //   variant: NOTISTACK_VARIANTS?.SUCCESS,
  //       // });
  //       // reset();
  //       // }
  //       // .then((res: any) => {
  //       //   const associationBody = {
  //       //     dealId: Quotenew?.data?.dealId,
  //       //     product: {
  //       //       productId: res?.data?._id,
  //       //       quantity: 1,
  //       //     },
  //       //   };
  //       //   createAssociationQuote({ body: associationBody })?.unwrap();
  //       //   enqueueSnackbar('Product added Successfully', {
  //       //     variant: NOTISTACK_VARIANTS?.SUCCESS,
  //       //   });
  //       //   reset();
  //       // });
  //     } catch (err: any) {
  //       enqueueSnackbar('Error while creating product', {
  //         variant: NOTISTACK_VARIANTS?.ERROR,
  //       });
  //     }
  //   }
  //   onClose();
  // };

  const onSubmit = async (values: any) => {
    try {
      delete values.productType;
      values.category = values?.category?._id;
      const formData = new FormData();
      Object.entries(values)?.forEach(([key, value]: any) => {
        if (value !== undefined && value !== null && value !== '') {
          formData?.append(key, value);
        }
      });
      if (actionType === DRAWER_TYPES?.CREATE) {
        const res: any = await postProduct({ body: formData })?.unwrap();

        if (res) {
          setProductsArray([...productsArray, res?.data]);
          const submitQuotesPayload = {
            id: dataGetQuoteById?.data?._id,
            status: 'DRAFT',
            products: [...productsArray, res?.data],
            dealAmount: dataGetQuoteById?.data?.dealAmount,
            subTotal: 0,
            invoiceDiscount: 0,
            RedeemedDiscount: 0,
            tax: 0,
            total: 0,
          };

          await putSubmitQuote({ body: submitQuotesPayload })?.unwrap();
          enqueueSnackbar('Product added Successfully', {
            variant: NOTISTACK_VARIANTS?.SUCCESS,
          });
          onClose();
          reset();
        }
      }
    } catch (err: any) {
      enqueueSnackbar('Error while creating product', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
      onClose();
    }
  };

  useEffect(() => {
    if (actionType === 'edit' || actionType === 'view') {
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
        sku: '',
        category: '',
        description: '',
        isActive: false,
        unitPrice: null,
        purchasePrice: null,
      });
    }
  }, [productId, actionType, reset, productByIdData?.data]);

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
