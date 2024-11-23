import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useAddGiftCardDetails } from './useAddGiftCardDetails';

export const AddGiftCardDetails = (props: any) => {
  const { isPortalOpen } = props;
  const {
    handleSubmit,
    onSubmit,
    methods,
    closeAddDigitalGiftCardForm,
    addGiftCardDetailsFormFields,
    addDigitalGiftCardDetailsStatus,
  } = useAddGiftCardDetails(props);
  return (
    <Box>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isAdd}
        onClose={closeAddDigitalGiftCardForm}
        title={'Add Transaction'}
        okText={'Create'}
        isOk
        cancelText={'Cancel'}
        footer
        submitHandler={handleSubmit(onSubmit)}
        isLoading={addDigitalGiftCardDetailsStatus?.isLoading}
        isDisabled={addDigitalGiftCardDetailsStatus?.isLoading}
        disabledCancelBtn={addDigitalGiftCardDetailsStatus?.isLoading}
      >
        <Box>
          <FormProvider methods={methods}>
            <Grid container spacing={2}>
              {addGiftCardDetailsFormFields?.map((item: any) => (
                <Grid item xs={12} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </Box>
  );
};
