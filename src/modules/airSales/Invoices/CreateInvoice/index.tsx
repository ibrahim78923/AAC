import { Box, Grid, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { getDataArray } from './CreateInvoice.data';
import useCreateInvoice from './useCreateInvoice';
import QuoteInvoice from '../QuoteInvoice';

const CreateInvoice = () => {
  const { methods, QuoteData, quoteId } = useCreateInvoice();

  const dataArray = getDataArray(QuoteData);

  return (
    <Box>
      <Typography variant="h3" mb={3}>
        Invoice
      </Typography>
      <Box sx={{ maxWidth: '400px' }}>
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {dataArray?.map((item: any) => (
              <Grid item xs={12} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
      {quoteId && <QuoteInvoice quoteId={quoteId} />}
    </Box>
  );
};

export default CreateInvoice;
