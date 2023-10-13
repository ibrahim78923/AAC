import { Box, Button, Stack } from '@mui/material';

import AppHorizontalStepper from '@/components/Stepper';
import { CreateInvoicesStepperData } from './CreateInvoices.data';

import { useRouter } from 'next/router';

const CreateInvoice = () => {
  const router = useRouter();
  const { invoicesStepperData } = CreateInvoicesStepperData();

  return (
    <Box>
      <AppHorizontalStepper stepsArray={invoicesStepperData} />
      <Stack justifyContent="space-between" alignItems="center" direction="row">
        <Button
          variant="outlined"
          // onClick={() => setIsListView(false)}
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
