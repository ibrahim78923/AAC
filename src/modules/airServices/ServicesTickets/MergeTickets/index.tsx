import { FormProvider } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import { useMergedTickets } from './useMergeTickets';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { CrispTicketInfo } from '../CrispTicketInfo';

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
        <Grid container spacing={1}>
          {mergeTicketsFormFields?.map((item: ReactHookFormFieldsI) => (
            <Grid item xs={12} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'}>
                {item?.heading ? item?.heading : null}
              </item.component>
            </Grid>
          ))}
        </Grid>
        <br />
        <CrispTicketInfo singleTicketDetail={singleTicketDetail} />
      </FormProvider>
    </CustomCommonDialog>
  );
};
