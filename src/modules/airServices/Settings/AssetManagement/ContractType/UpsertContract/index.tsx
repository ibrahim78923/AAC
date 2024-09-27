import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FormProvider } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import useUpsertContract from './useUpsertContract';
import { ContractFieldsFormDataArray } from './UpsertContract.data';

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
    <Dialog open={openDialog?.open} onClose={onClose} maxWidth={'sm'} fullWidth>
      <DialogTitle
        variant={'h3'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography variant={'h5'} component={'span'}>
          {openDialog?.data ? 'Edit Contract Type' : 'Add Contract Type'}
        </Typography>

        <CloseIcon onClick={onClose} sx={{ cursor: 'pointer' }} />
      </DialogTitle>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={1}>
            {ContractFieldsFormDataArray?.map((item: any) => (
              <Grid item xs={12} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            type={'button'}
            variant={'outlined'}
            color={'inherit'}
            onClick={onClose}
            disabled={
              postContractTypeStatus?.isLoading ||
              patchContractTypeStatus?.isLoading
            }
          >
            Cancel
          </Button>
          <LoadingButton
            type={'submit'}
            variant={'contained'}
            disabled={
              postContractTypeStatus?.isLoading ||
              patchContractTypeStatus?.isLoading
            }
            loading={
              postContractTypeStatus?.isLoading ||
              patchContractTypeStatus?.isLoading
            }
          >
            {openDialog?.data ? 'Update' : 'Save'}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
