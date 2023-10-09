import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import ChooseQuotes from './ChooseQuotes/ChooseQuotes';
import EditDetails from './EditDetails';
import { useRouter } from 'next/router';
import ReviewInvoice from './ReviewInvoice';

const CreateInvoice = () => {
  const router = useRouter();

  return (
    <Box>
      <Typography variant="h3">Step 1</Typography>
      <ChooseQuotes />
      <Typography variant="h3">Step 2</Typography>
      <EditDetails />
      <Typography variant="h3">Step 3</Typography>
      <ReviewInvoice />
      <Stack justifyContent="space-between" alignItems="center" direction="row">
        <Button
          variant="outlined"
          onClick={() => router.push('/sales-invoices')}
        >
          Back
        </Button>
        <Box>
          <Stack gap="10px" direction="row">
            <Button
              variant="outlined"
              onClick={() => router.push('/sales-invoices')}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              onClick={() => router.push('/sales-invoices')}
            >
              Skip
            </Button>
            <Button variant="contained">Next</Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default CreateInvoice;
