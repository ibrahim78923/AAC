import { Button, Stack } from '@mui/material';
import AppHorizontalStepper from '@/components/Stepper';
import FormCreateDeal from './FormCreateDeal';
import useCreateQuote from './useCreateQuote';
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
          <Stack
            direction={{ sm: 'row' }}
            justifyContent="space-between"
            gap={2}
            mt={2}
          >
            <Button
              onClick={handleStepperCancel}
              variant="outlined"
              color="inherit"
            >
              Back
            </Button>
            <Stack direction={{ sm: 'row' }} gap={2}>
              <Button
                onClick={handleStepperCancel}
                variant="outlined"
                color="inherit"
              >
                Cancel
              </Button>
              <LoadingButton
                loading={loadingAddQuote}
                variant="contained"
                onClick={handleAddQuoteSubmit}
                sx={{
                  marginLeft: { xs: '3px !important', sm: '12px !important' },
                }}
              >
                Save & Continue
              </LoadingButton>
            </Stack>
          </Stack>
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
