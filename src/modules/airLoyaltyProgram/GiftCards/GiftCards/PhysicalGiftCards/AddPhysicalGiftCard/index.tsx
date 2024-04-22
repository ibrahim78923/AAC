import CommonDrawer from '@/components/CommonDrawer';

import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useAddPhysicalGiftCard } from './useAddPhysicalGiftCard';

export const AddPhysicalGiftCard = (props: any) => {
  const { isPortalOpen } = props;
  const {
    handleSubmit,
    submitAddPhysicalGiftCard,
    methods,
    closeAddPhysicalGiftCardForm,
    addPhysicalGiftCardFormFields,
    addPhysicalGiftCardStatus,
  } = useAddPhysicalGiftCard(props);
  return (
    <Box>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isAdd}
        onClose={closeAddPhysicalGiftCardForm}
        title={'Add Physical Card'}
        okText={'Create'}
        isOk
        cancelText={'Cancel'}
        footer
        submitHandler={handleSubmit(submitAddPhysicalGiftCard)}
        isLoading={addPhysicalGiftCardStatus?.isLoading}
        isDisabled={addPhysicalGiftCardStatus?.isLoading}
        disabledCancelBtn={addPhysicalGiftCardStatus?.isLoading}
      >
        <Box>
          <FormProvider methods={methods}>
            <Grid container spacing={2}>
              {addPhysicalGiftCardFormFields?.map((item: any) => (
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
