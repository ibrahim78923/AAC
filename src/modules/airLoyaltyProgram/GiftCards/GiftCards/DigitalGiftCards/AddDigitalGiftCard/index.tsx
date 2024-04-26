import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useAddDigitalGiftCard } from './useAddDigitalGiftCard';

export const AddDigitalGiftCard = (props: any) => {
  const { isPortalOpen } = props;
  const {
    handleSubmit,
    onSubmit,
    methods,
    closeAddDigitalGiftCardForm,
    addDigitalGiftCardFormFields,
    addDigitalGiftCardStatus,
  } = useAddDigitalGiftCard(props);

  return (
    <Box>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isAdd}
        onClose={() => closeAddDigitalGiftCardForm?.()}
        title={'Add Digital Card'}
        okText={'Create'}
        isOk
        cancelText={'Cancel'}
        footer
        submitHandler={handleSubmit(onSubmit)}
        isLoading={addDigitalGiftCardStatus?.isLoading}
        isDisabled={addDigitalGiftCardStatus?.isLoading}
        disabledCancelBtn={addDigitalGiftCardStatus?.isLoading}
      >
        <Box>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {addDigitalGiftCardFormFields?.map((item: any) => (
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
