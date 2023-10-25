import { Box, Button, Divider, Stack, TextField } from '@mui/material';
import AppHorizontalStepper from '@/components/Stepper';
import useCreateInvoices from './useCreateInvoices';
import { useRouter } from 'next/router';
import useReviewInvoice from './ReviewInvoice/useReviewInvoice';
import { ScheduleModals } from '@/components/ScheduleModals';
import { style } from './CreateInvoice.style';

const CreateInvoice = () => {
  const {
    activeStep,
    invoicesStepperData,
    handleCompleteStep,
    hanldeGoPreviousBack,
  } = useCreateInvoices();
  const router = useRouter();
  const { isEmailModal, setIsEmailModal } = useReviewInvoice();

  return (
    <Box sx={style.stepperPages}>
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
              <Button
                variant="outlined"
                disabled={activeStep === 0 ? true : false}
                sx={style.greyButton}
                onClick={hanldeGoPreviousBack}
              >
                Back
              </Button>
              <Box>
                <Stack gap="10px" direction="row">
                  {activeStep === 0 || activeStep === 1 ? (
                    <Button
                      variant="outlined"
                      sx={style.greyButton}
                      onClick={() => router.push('/air-sales/invoices')}
                    >
                      Cancel
                    </Button>
                  ) : (
                    <Button variant="outlined" sx={style.greyButton}>
                      Save as Draft
                    </Button>
                  )}
                  {activeStep == 0 && (
                    <Button
                      variant="outlined"
                      sx={style.greyButton}
                      onClick={() => router.push('/air-sales/invoices')}
                    >
                      Skip
                    </Button>
                  )}
                  {activeStep === 0 || activeStep === 1 ? (
                    <Button variant="contained" onClick={handleCompleteStep}>
                      Next
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => setIsEmailModal(true)}
                    >
                      Send To Customer
                    </Button>
                  )}
                </Stack>
              </Box>
            </Stack>
          </>
        }
      />
      <ScheduleModals
        type="assign"
        open={isEmailModal}
        handleClose={() => {
          setIsEmailModal(false);
        }}
        handleSubmit={() => {
          setIsEmailModal(false);
        }}
        submitButonText="Send"
        isFooter
      >
        <Box my={3}>
          <label>Email</label>
          <TextField
            fullWidth
            type="email"
            placeholder="abc@ceative.co.uk"
            size="small"
          />
        </Box>
      </ScheduleModals>
    </Box>
  );
};

export default CreateInvoice;
