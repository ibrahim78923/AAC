import CommonDrawer from '@/components/CommonDrawer';
import { Box } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useAddGiftCards } from './useAddGiftCards';
import { FormGrid } from '@/components/Grids/FormGrid';

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
            <FormGrid formFieldsList={addGiftCardFormFields} />
          </FormProvider>
        </Box>
      </CommonDrawer>
    </>
  );
};
