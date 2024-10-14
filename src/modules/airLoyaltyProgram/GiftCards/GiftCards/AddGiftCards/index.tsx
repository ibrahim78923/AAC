import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useAddGiftCards } from './useAddGiftCards';

export const AddGiftCards = (props: any) => {
  const { isPortalOpen } = props;
  const {
    handleSubmit,
    onSubmit,
    methods,
    closeAddGiftCardForm,
    addGiftCardFormFields,
    addGiftCardStatus,
  } = useAddGiftCards(props);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isAdd}
        onClose={() => closeAddGiftCardForm?.()}
        title={'Add Gift Card'}
        okText={'Create'}
        isOk
        cancelText={'Cancel'}
        footer
        submitHandler={handleSubmit(onSubmit)}
        isLoading={addGiftCardStatus?.isLoading}
        isDisabled={addGiftCardStatus?.isLoading}
        disabledCancelBtn={addGiftCardStatus?.isLoading}
      >
        <Box>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {addGiftCardFormFields?.map((item: any) => (
                <Grid item xs={12} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </>
  );
};
