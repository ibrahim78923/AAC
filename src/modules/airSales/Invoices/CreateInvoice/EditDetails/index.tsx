import { Box, Grid } from '@mui/material';
import DetailCard from './DetailCard';
import ProductsTable from './ProductsTable';
import {
  useGetInvoiceIdQuery,
  useLazyGetInvoiceQoutesListQuery,
} from '@/services/airSales/invoices';
import { isNullOrEmpty } from '@/utils';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  defaultValues,
  getDataArray,
  validationSchema,
} from './EditDetails.data';

const EditDetails = () => {
  const QuoteData = useLazyGetInvoiceQoutesListQuery();
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const { handleSubmit, watch } = methods;
  const watchFields = watch(['Quote']);
  const QuoteID = watchFields[0]?._id;

  const { data } = useGetInvoiceIdQuery(
    { id: QuoteID },
    { skip: isNullOrEmpty(QuoteID) },
  );
  const onSubmit = async () => {};
  const dataArray = getDataArray(QuoteData);

  return (
    <Box className="stepper-content">
      <Grid container>
        <Grid xs={12} md={4}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {dataArray?.map((item: any) => (
                <Grid item xs={12} key={item?.id}>
                  <item.component {...item?.componentProps} />
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Grid>
      </Grid>
      <DetailCard data={data?.data} />
      <ProductsTable data={data?.data} />
    </Box>
  );
};

export default EditDetails;
