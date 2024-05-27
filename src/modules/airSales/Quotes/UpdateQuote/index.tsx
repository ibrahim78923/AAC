import { Box, Button, Stack } from '@mui/material';
import AppHorizontalStepper from '@/components/Stepper';
import FormCreateDeal from './FormCreateDeal';
import useUpdateQuote from './useUpdateQuote';
import FormAddCompany from './FormAddCompany';
import FormCreateProduct from './FormCreateProduct';
import DialogSendToCustomer from './DialogSendToCustomer';
import { styles } from './UpdateQuote.style';
import { updateQuoteSteps } from './UpdateQuote.data';
import CreateContacts from './CreateContacts';
import { LoadingButton } from '@mui/lab';

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
    disabledSaveAndContinueBtn,
    handleBuyerContactChange,
    selectedBuyerContactIds,
    handleCompanyChange,
    selectedCompanyIds,
    loadingSubmit,
  } = useUpdateQuote();

  const stepsArgs: any = {
    data: dataGetQuoteById?.data,
    dealList: dataGetDeals?.data?.deals,
    detailValues: detailsValues,
    methodStepDeal: methodsUpdateQuote,
    openCreateDeal: handleOpenFormCreateDeal,
    openAddContact: handleOpenFormAddContact,
    openAddCompany: handleOpenFormAddCompany,
    openCreateProduct: handleOpenFormCreateProduct,
    methodsSignature: methodsSignature,
    handleBuyerContactChange: handleBuyerContactChange,
    selectedBuyerContactIds: selectedBuyerContactIds,
    handleCompanyChange: handleCompanyChange,
    selectedCompanyIds: selectedCompanyIds,
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
            {activeStep > 1 && (
              <Button
                onClick={handleStepBack}
                variant="outlined"
                sx={{ ...styles?.btnBack, width: { xs: '100%', sm: 'auto' } }}
              >
                Back
              </Button>
            )}
            <Box sx={{ flex: '1' }}></Box>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={'12px'}
              width={{ xs: '100%', sm: 'auto' }}
            >
              {activeStep !== steps?.length - 1 && (
                <>
                  <Button
                    onClick={handleStepperCancel}
                    variant="outlined"
                    sx={{
                      ...styles?.btnBack,
                      width: { xs: '100%', sm: 'auto' },
                    }}
                  >
                    Cancel
                  </Button>

                  {activeStep !== 2 && activeStep !== 3 && (
                    <Button
                      variant="contained"
                      onClick={handleUpdateDetails}
                      disabled={!disabledSaveAndContinueBtn}
                      sx={{ width: { xs: '100%', sm: 'auto' } }}
                    >
                      Save & Continue
                    </Button>
                  )}

                  {activeStep !== 2 && activeStep !== 3 && activeStep !== 4 ? (
                    <></>
                  ) : (
                    <Button
                      onClick={handleStepNext}
                      variant="outlined"
                      sx={styles?.btnBack}
                    >
                      Next
                    </Button>
                  )}
                </>
              )}

              {activeStep === steps.length - 1 && (
                <>
                  <LoadingButton
                    variant="contained"
                    onClick={handleFormSubmit}
                    loading={loadingSubmit}
                  >
                    Save & Submit Later
                  </LoadingButton>
                  <Button onClick={handleOpenDialog} variant="contained">
                    Submit
                  </Button>
                </>
              )}
            </Stack>
          </Box>
        }
      />
      {isOpenDialog && (
        <DialogSendToCustomer open={isOpenDialog} onClose={handleCloseDialog} />
      )}

      {isOpenFormCreateDeal && (
        <FormCreateDeal
          open={isOpenFormCreateDeal}
          onClose={handleCloseFormCreateDeal}
        />
      )}

      {isOpenFormAddContact && (
        <CreateContacts
          open={isOpenFormAddContact}
          onClose={handleCloseFormAddContact}
          dealId={dataGetQuoteById?.data?.dealId}
        />
      )}

      {isOpenFormAddCompany && (
        <FormAddCompany
          open={isOpenFormAddCompany}
          onClose={handleCloseFormAddCompany}
        />
      )}

      {isOpenFormCreateProduct && (
        <FormCreateProduct
          open={isOpenFormCreateProduct}
          onClose={handleCloseFormCreateProduct}
        />
      )}
    </>
  );
};

export default UpdateQuote;
