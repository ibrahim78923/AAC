import { FormProvider } from '@/components/ReactHookForm';
import { useMergedTickets } from './useMergeTickets';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { CrispTicketInfo } from '../CrispTicketInfo';
import { HeadingFormGrid } from '@/components/Grids/HeadingFormGrid';

export const MergeTickets = () => {
  const {
    methods,
    closeMergedTicketsModal,
    handleSubmit,
    submitMergedTicketsForm,
    mergeTicketsFormFields,
    postMergeTicketsStatus,
    isPortalOpen,
    singleTicketDetail,
  }: any = useMergedTickets();

  return (
    <CustomCommonDialog
      isPortalOpen={isPortalOpen?.isOpen}
      closePortal={closeMergedTicketsModal}
      dialogTitle="Merge"
      submitButtonText="Continue"
      showSubmitLoader={postMergeTicketsStatus?.isLoading}
      disabledCancelButton={postMergeTicketsStatus?.isLoading}
      handleSubmitButton={handleSubmit(submitMergedTicketsForm)}
    >
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(submitMergedTicketsForm)}
      >
        <HeadingFormGrid formFieldsList={mergeTicketsFormFields} />
        <br />
        <CrispTicketInfo singleTicketDetail={singleTicketDetail} />
      </FormProvider>
    </CustomCommonDialog>
  );
};
