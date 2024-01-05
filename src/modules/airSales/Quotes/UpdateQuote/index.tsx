import { Box, Button, Stack } from '@mui/material';
import AppHorizontalStepper from '@/components/Stepper';
import FormCreateDeal from './FormCreateDeal';
import useUpdateQuote from './useUpdateQuote';
// import FormAddContact from './FormAddContact';
import FormAddCompany from './FormAddCompany';
import FormCreateProduct from './FormCreateProduct';
import DialogSendToCustomer from './DialogSendToCustomer';
import { styles } from './UpdateQuote.style';
import { updateQuoteSteps } from './UpdateQuote.data';
import CreateContacts from './CreateContacts';

const UpdateQuote = () => {
  const {
    dataGetDeals,
    dataGetQuoteById,
    detailsValues,
    methodsUpdateQuote,
    activeStep,
    handleStepNext,
    handleStepBack,
    handleStepperCancel,
    handleFormSubmit,
    isOpenFormCreateDeal,
    handleOpenFormCreateDeal,
    handleCloseFormCreateDeal,
    isOpenFormAddContact,
    handleOpenFormAddContact,
    handleCloseFormAddContact,
    isOpenFormAddCompany,
    handleOpenFormAddCompany,
    handleCloseFormAddCompany,
    isOpenFormCreateProduct,
    handleOpenFormCreateProduct,
    handleCloseFormCreateProduct,
    handleOpenDialog,
    handleCloseDialog,
    isOpenDialog,
    methodsSignature,
    handleUpdateDetails,
  } = useUpdateQuote();

  const stepsArgs = {
    data: dataGetQuoteById?.data,
    dealList: dataGetDeals?.data?.deals,
    detailValues: detailsValues,
    methodStepDeal: methodsUpdateQuote,
    openCreateDeal: handleOpenFormCreateDeal,
    openAddContact: handleOpenFormAddContact,
    openAddCompany: handleOpenFormAddCompany,
    openCreateProduct: handleOpenFormCreateProduct,
    methodsSignature: methodsSignature,
  };

  const steps = updateQuoteSteps(stepsArgs);

  return (
    <>
      <AppHorizontalStepper
        activeStep={activeStep}
        stepperPadding="4rem 0 0"
        stepperMargin="2rem 0 0"
        stepsArray={steps}
        stepperButtons={
          <Box sx={styles?.stepperButtons}>
            {activeStep > 0 && (
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
              {activeStep !== steps?.length - 1 && (
                <>
                  <Button
                    onClick={handleStepperCancel}
                    variant="outlined"
                    sx={styles?.btnBack}
                  >
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={handleUpdateDetails}>
                    Save & Continue
                  </Button>
                  <Button
                    onClick={handleStepNext}
                    variant="outlined"
                    sx={styles?.btnBack}
                  >
                    Next
                  </Button>
                </>
              )}

              {activeStep === steps.length - 1 && (
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

      <DialogSendToCustomer open={isOpenDialog} onClose={handleCloseDialog} />

      <FormCreateDeal
        open={isOpenFormCreateDeal}
        onClose={handleCloseFormCreateDeal}
      />

      <CreateContacts
        open={isOpenFormAddContact}
        onClose={handleCloseFormAddContact}
      />
      {/* <FormAddContact
        open={isOpenFormAddContact}
        onClose={handleCloseFormAddContact}
      /> */}

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

export default UpdateQuote;
