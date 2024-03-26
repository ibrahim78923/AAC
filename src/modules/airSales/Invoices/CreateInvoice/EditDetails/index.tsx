import { Box, Grid } from '@mui/material';
// import DetailCard from './DetailCard';
// import ProductsTable from './ProductsTable';
// import { isNullOrEmpty } from '@/utils';
import { FormProvider } from '@/components/ReactHookForm';
import useEditDetails from './useEditDetails';
import { getDataArray } from './EditDetails.data';

const EditDetails = () => {
  const {
    methods,
    QuoteData,
    // invoiceDataById,
    // loadingInvoiceData
  } = useEditDetails();

  const dataArray = getDataArray(QuoteData);

  return (
    <Box className="stepper-content">
      <Grid container>
        <Grid xs={12} md={4}>
          <FormProvider methods={methods}>
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
      {/* <DetailCard data={invoiceDataById} />
      <ProductsTable data={invoiceDataById} /> */}
    </Box>
  );
};

export default EditDetails;
