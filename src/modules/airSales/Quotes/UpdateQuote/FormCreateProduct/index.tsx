import { Grid, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { FormProvider } from '@/components/ReactHookForm';
import { yupResolver } from '@hookform/resolvers/yup';
import CommonDrawer from '@/components/CommonDrawer';
import {
  addContactFields,
  ProductValidationSchema,
  initValues,
} from './FormCreateProduct.data';
import {
  useCreateAssociationQuoteMutation,
  useGetProductCatagoriesQuery,
  useGetQuoteByIdQuery,
  useLazyGetProductsByIdQuery,
  usePostProductMutation,
  useUpdateProductByIdMutation,
} from '@/services/airSales/quotes';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const FormCreateProduct = ({ open, onClose }: any) => {
  const params = useSearchParams();
  const actionType = params.get('type');
  const disableForm = actionType === 'view' ? true : false;
  const quoteId = params.get('data');
  const productId = params.get('productId');

  const [postProduct, { isLoading: loadingProductPost }] =
    usePostProductMutation();

  const [updateProductById] = useUpdateProductByIdMutation();

  const { data: Quotenew } = useGetQuoteByIdQuery({ id: quoteId });

  const { data: productCatagories } = useGetProductCatagoriesQuery({});

  const [lazyGetProductsByIdQuery] = useLazyGetProductsByIdQuery();

  const [createAssociationQuote] = useCreateAssociationQuoteMutation();

  const methods: any = useForm<any>({
    resolver: yupResolver(ProductValidationSchema),
    defaultValues: initValues,
  });
  const { handleSubmit, reset } = methods;

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
    if (actionType === 'edit') {
      try {
        await updateProductById({ id: productId, body: formData })
          ?.unwrap()
          .then((res: any) => {
            const associationBody = {
              dealId: Quotenew?.data?.dealId,
              product: {
                productId: res?.data?._id,
                quantity: 1,
              },
            };
            createAssociationQuote({ body: associationBody })?.unwrap();
            enqueueSnackbar('Product Updated Successfully', {
              variant: NOTISTACK_VARIANTS?.SUCCESS,
            });
          });
      } catch (err: any) {
        enqueueSnackbar(err?.message, {
          variant: NOTISTACK_VARIANTS?.ERROR,
        });
      }
    } else if (actionType === 'create') {
      try {
        await postProduct({ body: formData })
          ?.unwrap()
          .then((res: any) => {
            const associationBody = {
              dealId: Quotenew?.data?.dealId,
              product: {
                productId: res?.data?._id,
                quantity: 1,
              },
            };
            createAssociationQuote({ body: associationBody })?.unwrap();
            enqueueSnackbar('Product added Successfully', {
              variant: NOTISTACK_VARIANTS?.SUCCESS,
            });
            reset();
          });
      } catch (err: any) {
        enqueueSnackbar(err?.message, {
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
      // Reset form fields if actionType or productId changes
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
            {addContactFields(productCatagories?.data?.productcategories)?.map(
              (item: any) => (
                <Grid item xs={12} key={item.name}>
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
              ),
            )}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

export default FormCreateProduct;
