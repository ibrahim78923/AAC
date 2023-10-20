import { Box } from '@mui/material';

import AppHorizontalStepper from '@/components/Stepper';
import { CreateInvoicesStepperData } from './CreateInvoices.data';

const CreateInvoice = () => {
  const { invoicesStepperData } = CreateInvoicesStepperData();

  return (
    <Box>
      <AppHorizontalStepper stepsArray={invoicesStepperData} />
    </Box>
  );
};

export default CreateInvoice;
