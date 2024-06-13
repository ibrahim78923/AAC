import CommonDrawer from '@/components/CommonDrawer';
import { Box, Button, Grid, Typography } from '@mui/material';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { useBuyMoreCredits } from './useBuyMoreCredits';
const BuyMoreCredits = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;
  const {
    methods,
    handleSubmit,
    onSubmit,
    cancelBuyMoreCreditsForm,
    buyMoreCreditsFormFields,
    setAddNewCard,
    addNewCard,
    secureTransaction,
    emailButton,
    setEmailButton,
  } = useBuyMoreCredits(props);
  return (
    <CommonDrawer
      footer
      isDrawerOpen={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
      title="Buy More Credits"
      okText={addNewCard ? 'Save' : 'Buy'}
      cancelText="Cancel"
      isOk
      submitHandler={handleSubmit(onSubmit)}
      cancelBtnHandler={() => cancelBuyMoreCreditsForm?.()}
    >
      <Box mt={1}>
        {!addNewCard && (
          <>
            <Box mb={2}>
              <Typography variant="h6" color="slateBlue.main" fontWeight={700}>
                Primary company address
              </Typography>
              <Typography variant="body1" color="blue.light">
                123 Lewis st,
              </Typography>
              <Typography variant="body1" color="slateBlue.main">
                Cambridge, MA 11111111
              </Typography>
              <Typography variant="body1" color="slateBlue.main">
                United Kingdom, UK
              </Typography>
            </Box>
            <Typography
              variant="h6"
              color="slateBlue.main"
              fontWeight={700}
              mb={2}
            >
              Payment Methods
            </Typography>
          </>
        )}
        <FormProvider methods={methods}>
          <Grid container spacing={1}>
            {buyMoreCreditsFormFields?.map((item: any) => (
              <Grid item xs={12} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
            {secureTransaction && addNewCard && (
              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end" gap={1}>
                  <Button
                    disableElevation
                    variant={emailButton ? 'contained' : 'outlined'}
                    onClick={() => setEmailButton(true)}
                    sx={{ width: 100 }}
                  >
                    Email
                  </Button>
                  <Button
                    disableElevation
                    variant={!emailButton ? 'contained' : 'outlined'}
                    onClick={() => setEmailButton(false)}
                    sx={{ width: 100 }}
                  >
                    Mobile
                  </Button>
                </Box>
                <Box>
                  <RHFTextField
                    name="email"
                    label={'Receive OTP on'}
                    size={'small'}
                    fullWidth
                    placeholder={`Enter ${emailButton ? 'Email' : 'Mobile No'}`}
                    required
                  />
                </Box>
              </Grid>
            )}
          </Grid>
        </FormProvider>
        {!addNewCard && (
          <Typography
            variant="body1"
            color="primary.main"
            fontWeight={500}
            mt={2}
            sx={{ cursor: 'pointer' }}
            onClick={() => setAddNewCard(true)}
          >
            Add another payment method
          </Typography>
        )}
      </Box>
    </CommonDrawer>
  );
};
export default BuyMoreCredits;
