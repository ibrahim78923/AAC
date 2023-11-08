import { Box, Button, Stack } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import AppHorizontalStepper from '@/components/Stepper';
import FormCreateDeal from './FormCreateDeal';
import useCreateQuote from './useCreateQuote';
import FormAddContact from './FormAddContact';
import FormAddCompany from './FormAddCompany';
import FormCreateProduct from './FormCreateProduct';
import DialogSendToCustomer from './DialogSendToCustomer';
import { styles } from './CreateQuote.style';

const CreateQuote = () => {
  const {
    methods,
    createQuoteSteps,
    activeStep,
    handleStepNext,
    handleStepBack,
    handleStepperCancel,
    handleFormSubmit,
    isOpenFormCreateDeal,
    handleCloseFormCreateDeal,
    isOpenFormAddContact,
    handleCloseFormAddContact,
    isOpenFormAddCompany,
    handleCloseFormAddCompany,
    isOpenFormCreateProduct,
    handleCloseFormCreateProduct,
    handleOpenDialog,
    handleCloseDialog,
    isOpenDialog,
  } = useCreateQuote();

  return (
    <>
      <FormProvider methods={methods}>
        <AppHorizontalStepper
          activeStep={activeStep}
          stepperPadding="4rem 0 0"
          stepperMargin="2rem 0 0"
          stepsArray={createQuoteSteps}
          stepperButtons={
            <Box sx={styles?.stepperButtons}>
              {activeStep !== createQuoteSteps.length - 1 && (
                <Button
                  onClick={handleStepBack}
                  variant="outlined"
                  sx={styles?.btnBack}
                >
                  Back
                </Button>
              )}
              <Box sx={{ flex: '1' }}></Box>
              <Stack direction={'row'} spacing={'12px'}>
                {activeStep !== createQuoteSteps.length - 1 && (
                  <>
                    <Button
                      onClick={handleStepperCancel}
                      variant="outlined"
                      sx={styles?.btnBack}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleStepNext} variant="contained">
                      Save & Continue
                    </Button>
                  </>
                )}

                {activeStep === createQuoteSteps.length - 1 && (
                  <>
                    <Button onClick={handleFormSubmit} variant="contained">
                      Save & Submit Later
                    </Button>
                    <Button
                      onClick={handleStepBack}
                      variant="outlined"
                      sx={styles?.btnBack}
                    >
                      Preview
                    </Button>
                    <Button onClick={handleOpenDialog} variant="contained">
                      Submit
                    </Button>
                  </>
                )}
              </Stack>
            </Box>
          }
        />
      </FormProvider>

      <DialogSendToCustomer open={isOpenDialog} onClose={handleCloseDialog} />

      <FormCreateDeal
        open={isOpenFormCreateDeal}
        onClose={handleCloseFormCreateDeal}
      />

      <FormAddContact
        open={isOpenFormAddContact}
        onClose={handleCloseFormAddContact}
      />

      <FormAddCompany
        open={isOpenFormAddCompany}
        onClose={handleCloseFormAddCompany}
      />

      <FormCreateProduct
        open={isOpenFormCreateProduct}
        onClose={handleCloseFormCreateProduct}
      />
    </>
  );
};

export default CreateQuote;
