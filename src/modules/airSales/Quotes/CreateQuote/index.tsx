import { Box, Button, Stack } from '@mui/material';
import AppHorizontalStepper from '@/components/Stepper';
import FormCreateDeal from './FormCreateDeal';
import useCreateQuote from './useCreateQuote';
import { styles } from './CreateQuote.style';
import { LoadingButton } from '@mui/lab';

const CreateQuote = () => {
  const {
    createQuoteSteps,
    activeStep,
    handleStepperCancel,
    isOpenFormCreateDeal,
    handleCloseFormCreateDeal,
    handleAddQuoteSubmit,
    loadingAddQuote,
  } = useCreateQuote();

  return (
    <>
      <AppHorizontalStepper
        activeStep={activeStep}
        stepperPadding="4rem 0 0"
        stepperMargin="2rem 0 0"
        stepsArray={createQuoteSteps}
        stepperButtons={
          <Box sx={styles?.stepperButtons}>
            <Button
              onClick={handleStepperCancel}
              variant="outlined"
              sx={styles?.btnBack}
            >
              Back
            </Button>
            <Box sx={{ flex: '1' }}></Box>
            <Stack direction={'row'} spacing={'12px'}>
              <Button
                onClick={handleStepperCancel}
                variant="outlined"
                sx={styles?.btnBack}
              >
                Cancel
              </Button>
              <LoadingButton
                loading={loadingAddQuote}
                variant="contained"
                onClick={handleAddQuoteSubmit}
              >
                Save & Continue
              </LoadingButton>
            </Stack>
          </Box>
        }
      />

      <FormCreateDeal
        open={isOpenFormCreateDeal}
        onClose={handleCloseFormCreateDeal}
      />
    </>
  );
};

export default CreateQuote;
