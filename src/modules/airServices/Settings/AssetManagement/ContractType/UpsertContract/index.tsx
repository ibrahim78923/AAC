import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import useUpsertContract from './useUpsertContract';
import { ContractFieldsFormDataArray } from './UpsertContract.data';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

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
        <Grid container spacing={1}>
          {ContractFieldsFormDataArray?.map((item: any) => (
            <Grid item xs={12} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CustomCommonDialog>
  );
}
