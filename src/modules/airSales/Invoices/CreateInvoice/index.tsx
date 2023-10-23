import { Box, Button, Divider, Stack } from '@mui/material';
import AppHorizontalStepper from '@/components/Stepper';
import useCreateInvoices from './useCreateInvoices';
import { useRouter } from 'next/router';

const CreateInvoice = () => {
  // const { invoicesStepperData } = CreateInvoicesStepperData();
  const {
    activeStep,
    invoicesStepperData,
    handleCompleteStep,
    hanldeGoPreviousBack,
  } = useCreateInvoices();
  const router = useRouter();
  return (
    <Box>
      <AppHorizontalStepper
        activeStep={activeStep}
        stepsArray={invoicesStepperData}
        stepperButtons={
          <>
            <Divider sx={{ backgroundColor: '#E5E7EB' }} />
            <Stack
              justifyContent="space-between"
              alignItems="center"
              direction="row"
              mt={2}
            >
              <Button variant="outlined" onClick={hanldeGoPreviousBack}>
                Back
              </Button>
              <Box>
                <Stack gap="10px" direction="row">
                  <Button
                    variant="outlined"
                    onClick={() => router.push('/air-sales/sales-invoices')}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => router.push('/air-sales/sales-invoices')}
                  >
                    Skip
                  </Button>
                  <Button variant="contained" onClick={handleCompleteStep}>
                    Next
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </>
        }
      />
    </Box>
  );
};

export default CreateInvoice;
