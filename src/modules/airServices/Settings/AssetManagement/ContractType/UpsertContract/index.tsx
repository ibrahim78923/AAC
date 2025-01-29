import { FormProvider } from '@/components/ReactHookForm';
import useUpsertContract from './useUpsertContract';
import { contractTypeFormFields } from './UpsertContract.data';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { FormGrid } from '@/components/Grids/FormGrid';

export default function UpsertContract({ openDialog, setOpenDialog }: any) {
  const {
    onClose,
    methods,
    handleSubmit,
    onSubmit,
    postContractTypeStatus,
    patchContractTypeStatus,
  } = useUpsertContract({ openDialog, setOpenDialog });

  return (
    <CustomCommonDialog
      isPortalOpen={openDialog?.open}
      closePortal={onClose}
      handleSubmitButton={handleSubmit(onSubmit)}
      disabledCancelButton={
        postContractTypeStatus?.isLoading || patchContractTypeStatus?.isLoading
      }
      showSubmitLoader={
        postContractTypeStatus?.isLoading || patchContractTypeStatus?.isLoading
      }
      submitButtonText={openDialog?.data ? 'Update' : 'Save'}
      dialogTitle={
        openDialog?.data ? 'Edit Contract Type' : 'Add Contract Type'
      }
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <FormGrid spacing={1} formFieldsList={contractTypeFormFields} />
      </FormProvider>
    </CustomCommonDialog>
  );
}
