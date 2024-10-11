import { FormProvider } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import { useMoveTickets } from './useMoveTickets';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

export const MoveTickets = () => {
  const {
    methods,
    closePortal,
    handleSubmit,
    submitMoveTicketsForm,
    moveTicketsFormFields,
    putTicketStatus,
    isPortalOpen,
  } = useMoveTickets();

  return (
    <CustomCommonDialog
      isPortalOpen={isPortalOpen?.isOpen}
      closePortal={closePortal}
      dialogTitle="Move"
      submitButtonText="Continue"
      showSubmitLoader={putTicketStatus?.isLoading}
      disabledCancelButton={putTicketStatus?.isLoading}
      handleSubmitButton={handleSubmit(submitMoveTicketsForm)}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={2}>
          {moveTicketsFormFields?.map((item: ReactHookFormFieldsI) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CustomCommonDialog>
  );
};
