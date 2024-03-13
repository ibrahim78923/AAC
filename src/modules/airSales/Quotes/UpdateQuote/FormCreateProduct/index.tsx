import { Grid, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { FormProvider } from '@/components/ReactHookForm';
import { yupResolver } from '@hookform/resolvers/yup';
import CommonDrawer from '@/components/CommonDrawer';
import {
  addContactFields,
  validationSchema,
  initValues,
} from './FormCreateProduct.data';
import {
  useCreateAssociationQuoteMutation,
  useGetProductCatagoriesQuery,
  useGetQuoteByIdQuery,
  usePostProductMutation,
} from '@/services/airSales/quotes';
import { useSearchParams } from 'next/navigation';
// import { useEffect } from 'react';

const FormCreateProduct = ({ open, onClose }: any) => {
  const params = useSearchParams();
  const disableForm = params.get('type') === 'view' ? true : false;
  const quoteId = params.get('data');
  // const productId = params.get('productId');

  const [postProduct] = usePostProductMutation();
  // const router = useRouter();
  // let quoteId;
  // if (router.query?.data) {
  //   quoteId = router.query?.data;
  // }
  const { data: Quotenew } = useGetQuoteByIdQuery({ id: quoteId });

  const { data: productCatagories } = useGetProductCatagoriesQuery({});

  const [createAssociationQuote] = useCreateAssociationQuoteMutation();

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initValues,
  });
  const { handleSubmit } = methods;

  const onSubmit = async (values: any) => {
    const formData = new FormData();
    formData?.append('image', values?.image);
    formData?.append('name', values?.name);
    formData?.append('sku', values?.sku);
    formData?.append('purchasePrice', values?.purchasePrice);
    formData?.append('category', values?.category);
    formData?.append('description', values?.description);
    formData?.append('unitPrice', values?.unitPrice);
    formData?.append('isActive', values?.isActive);

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
          enqueueSnackbar('Ticket Updated Successfully', {
            variant: 'success',
          });
        });
    } catch (err: any) {
      enqueueSnackbar(err?.data?.message, {
        variant: 'error',
      });
    }
  };

  // useEffect(() => {
  //   const singleProduct = Quotenew?.data?.products?.find(
  //     (product: { productId: string }) => product?.productId === productId,
  //   );
  // }, [productId]);

  return (
    <CommonDrawer
      title="Create Product"
      okText="Save"
      isDrawerOpen={open}
      onClose={onClose}
      isOk={true}
      cancelText={'Cancel'}
      footer={true}
      submitHandler={handleSubmit(onSubmit)}
    >
      <Box sx={{ pt: '27px' }}>
        <FormProvider methods={methods}>
          <Grid container spacing={'22px'}>
            {addContactFields(productCatagories?.data?.productcategories)?.map(
              (item: any) => (
                <Grid item xs={12} key={item.id}>
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
