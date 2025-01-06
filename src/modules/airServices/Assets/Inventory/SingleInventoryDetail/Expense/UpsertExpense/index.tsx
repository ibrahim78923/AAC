import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { useUpsertExpense } from './useUpsertExpense';
import { upsertExpenseFormFields } from './UpsertExpense.data';

export const UpsertExpense = (props: any) => {
  const { isPortalOpen } = props ?? {};

  const {
    apiCallInProgress,
    handleSubmit,
    methods,
    upsertExpenseSubmit,
    closeModal,
  } = useUpsertExpense(props);

  return (
    <>
      <CustomCommonDialog
        isPortalOpen={isPortalOpen?.isOpen}
        closePortal={() => closeModal?.()}
        dialogTitle={isPortalOpen?.action}
        submitButtonText="Save"
        showSubmitLoader={apiCallInProgress}
        disabledCancelButton={apiCallInProgress}
        handleSubmitButton={handleSubmit?.(upsertExpenseSubmit)}
      >
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {upsertExpenseFormFields?.map((form) => (
              <Grid item xs={12} md={form?.gridLength} key={form?.id}>
                <form.component {...form?.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </CustomCommonDialog>
    </>
  );
};
