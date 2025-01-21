import { FormProvider } from '@/components/ReactHookForm';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { useUpsertExpense } from './useUpsertExpense';
import { upsertExpenseFormFields } from './UpsertExpense.data';
import { FormGrid } from '@/components/Grids/FormGrid';

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
          <FormGrid formFieldsList={upsertExpenseFormFields} />
        </FormProvider>
      </CustomCommonDialog>
    </>
  );
};
