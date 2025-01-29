import CommonDrawer from '@/components/CommonDrawer';
import { Box } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useAddGiftCardDetails } from './useAddGiftCardDetails';
import { FormGrid } from '@/components/Grids/FormGrid';

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
            <FormGrid formFieldsList={addGiftCardDetailsFormFields} />
          </FormProvider>
        </Box>
      </CommonDrawer>
    </Box>
  );
};
