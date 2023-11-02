import { Box, Button, Divider, Stack, TextField } from '@mui/material';
import AppHorizontalStepper from '@/components/Stepper';
import useCreateInvoices from './useCreateInvoices';
import useReviewInvoice from './ReviewInvoice/useReviewInvoice';
import { ScheduleModals } from '@/components/ScheduleModals';
import { style } from './CreateInvoice.style';

const CreateInvoice = () => {
  const {
    activeStep,
    invoicesStepperData,
    handleCompleteStep,
    hanldeGoPreviousBack,
    handlerCancelButton,
  } = useCreateInvoices();

  const { isEmailModal, setIsEmailModal } = useReviewInvoice();

  return (
    <Box sx={style?.stepperPages}>
      <AppHorizontalStepper
        activeStep={activeStep}
        stepsArray={invoicesStepperData}
        stepperButtons={
          <>
            <Divider sx={{ backgroundColor: '#E5E7EB' }} />
            <Stack
              justifyContent="space-between"
              alignItems="center"
              direction={{ xs: 'column', sm: 'row' }}
              gap={1}
              mt={2}
            >
              <Box width={{ xs: '100%', sm: '' }}>
                <Button
                  variant="outlined"
                  disabled={activeStep === 0 ? true : false}
                  sx={style?.outlinedButton}
                  onClick={hanldeGoPreviousBack}
                  fullWidth
                >
                  Back
                </Button>
              </Box>
              <Stack
                gap="10px"
                direction={{ xs: 'column', sm: 'row' }}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                {activeStep === 0 || activeStep === 1 ? (
                  <Button
                    variant="outlined"
                    sx={style?.outlinedButton}
                    onClick={handlerCancelButton}
                  >
                    Cancel
                  </Button>
                ) : (
                  <Button variant="outlined" sx={style?.outlinedButton}>
                    Save as Draft
                  </Button>
                )}
                {activeStep == 0 && (
                  <Button
                    variant="outlined"
                    sx={style?.outlinedButton}
                    onClick={handlerCancelButton}
                  >
                    Skip
                  </Button>
                )}
                {activeStep === 0 || activeStep === 1 ? (
                  <Button
                    variant="contained"
                    sx={style?.containedButton}
                    onClick={handleCompleteStep}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    sx={style?.containedButton}
                    onClick={() => setIsEmailModal(true)}
                  >
                    Send To Customer
                  </Button>
                )}
              </Stack>
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
        handleSubmit={() => {}}
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
