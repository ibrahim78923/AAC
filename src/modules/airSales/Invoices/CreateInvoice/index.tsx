import { Box, Grid, Stack, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { getDataArray } from './CreateInvoice.data';
import useCreateInvoice from './useCreateInvoice';
import QuoteInvoice from '../QuoteInvoice';
import Link from 'next/link';
import { ArrowBackIcon } from '@/assets/icons';
import { AIR_SALES } from '@/routesConstants/paths';

const CreateInvoice = () => {
  const { methods, QuoteData, quoteId } = useCreateInvoice();

  const dataArray = getDataArray(QuoteData);

  return (
    <Box>
      <Stack direction="row" mb={3} sx={{ alignItems: 'center' }}>
        <Box
          component={Link}
          href={AIR_SALES?.SALES_INVOICES}
          sx={{
            display: 'flex',
            height: '36px',
            alignItems: 'center',
            pr: '16px',
          }}
        >
          <ArrowBackIcon />
        </Box>
        <Typography variant="h3">Invoice</Typography>
      </Stack>

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
