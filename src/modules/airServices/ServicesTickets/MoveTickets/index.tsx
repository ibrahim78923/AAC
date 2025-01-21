import { FormProvider } from '@/components/ReactHookForm';
import { useMoveTickets } from './useMoveTickets';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { FormGrid } from '@/components/Grids/FormGrid';

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
        <FormGrid formFieldsList={moveTicketsFormFields} />
      </FormProvider>
    </CustomCommonDialog>
  );
};
