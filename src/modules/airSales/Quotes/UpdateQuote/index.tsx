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
import { useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { setOpenModalChooseSignature } from '@/redux/slices/airSales/Quotes/quotesSlice';
import { useUpdateCommonContractMutation } from '@/services/commonFeatures/contracts';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

const UpdateQuote = () => {
  const dispatch = useDispatch();
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
    handleOpenDialog,
    handleCloseDialog,
    isOpenDialog,
    handleUpdateDetails,
    disabledSaveAndContinueBtn,
    handleBuyerContactChange,
    selectedBuyerContactIds,
    handleCompanyChange,
    selectedCompanyIds,
    loadingSubmit,
    updateBuyerInfoLoading,
    productsArray,
    calculations,
    setIsOpenFormCreateProduct,
    handleLoyalityCalulation,
    loyalityCalculation,
    pdfRef,
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
    handleBuyerContactChange: handleBuyerContactChange,
    selectedBuyerContactIds: selectedBuyerContactIds,
    handleCompanyChange: handleCompanyChange,
    selectedCompanyIds: selectedCompanyIds,
    productsArray: productsArray,
    calculations: calculations,
    handleLoyalityCalulation,
    loyalityCalculation,
    pdfRef,
  };
  const steps = updateQuoteSteps(stepsArgs);

  const consumersData: any = useAppSelector(
    (state) => state?.quotesForm?.consumers,
  );
  const redeemRewardData: any = useAppSelector(
    (state) => state?.quotesForm?.redeemReward,
  );

  const giftCardData: any = useAppSelector(
    (state) => state?.quotesForm?.giftCardData,
  );

  const voucherData: any = useAppSelector(
    (state) => state?.quotesForm?.voucherData,
  );

  const rewardId: any = useAppSelector((state) => state?.quotesForm?.rewardId);

  const includeSignature = useAppSelector(
    (state) => state?.quotesForm?.includeSignature,
  );

  const [updateCommonContract, { isLoading: loadingDeassociatedContract }] =
    useUpdateCommonContractMutation();

  const deassociateQuote = async () => {
    if (!dataGetQuoteById?.data?.contracts) return;
    const contractId = dataGetQuoteById?.data?.contracts?._id;
    const formData = new FormData();
    formData.append('quotesIds', JSON.stringify([]));

    try {
      await updateCommonContract({
        id: contractId,
        body: formData,
      })?.unwrap();
      successSnackbar('Quote deassociated successfully');
      handleStepNext();
    } catch (error: any) {
      errorSnackbar('An error occured');
    }
  };

  const handleActiveStep4 = () => {
    includeSignature === 'includeSignature'
      ? dispatch(setOpenModalChooseSignature(true))
      : dataGetQuoteById?.data?.contracts
        ? deassociateQuote()
        : handleStepNext();
  };

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
                color="inherit"
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
                    color="inherit"
                  >
                    Cancel
                  </Button>

                  {activeStep !== 2 && activeStep !== 3 && (
                    <LoadingButton
                      variant="contained"
                      onClick={() => {
                        activeStep === 1
                          ? handleUpdateDetails()
                          : activeStep === 4
                            ? handleActiveStep4()
                            : handleFormSubmit();
                      }}
                      disabled={!disabledSaveAndContinueBtn}
                      loading={
                        updateBuyerInfoLoading || loadingDeassociatedContract
                      }
                    >
                      Save & Continue
                    </LoadingButton>
                  )}

                  {activeStep !== 1 &&
                  activeStep !== 2 &&
                  activeStep !== 3 &&
                  activeStep !== 4 ? (
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
        <DialogSendToCustomer
          open={isOpenDialog}
          onClose={handleCloseDialog}
          calculations={calculations}
          loyalityCalculation={loyalityCalculation}
          consumersData={consumersData}
          redeemRewardData={redeemRewardData}
          giftCardData={giftCardData}
          rewardId={rewardId}
          voucherData={voucherData}
        />
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
          onClose={() => setIsOpenFormCreateProduct(false)}
          dataGetQuoteById={dataGetQuoteById}
          productsArray={productsArray}
        />
      )}
    </>
  );
};

export default UpdateQuote;
