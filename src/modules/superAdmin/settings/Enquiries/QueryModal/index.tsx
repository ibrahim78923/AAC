import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import { QueryModalPropsI } from './QueryModal.interface';

export default function ViewEnquiry({
  isModalOpen,
  onClose,
  methods,
  onSubmit,
  data,
  isLoading,
}: QueryModalPropsI) {
  return (
    <Dialog open={isModalOpen} onClose={onClose} fullWidth>
      <DialogTitle
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        mb={1}
      >
        <Typography variant={'h3'} component={'div'}>
          Enquiry Comment
        </Typography>
        <CloseIcon sx={{ cursor: 'pointer' }} onClick={onClose} />
      </DialogTitle>
      <FormProvider methods={methods}>
        <DialogContent sx={{ py: 0 }}>
          <Typography variant={'h6'}>{data?.query}</Typography>

          <Grid container mt={2}>
            <Grid item xs={12}>
              <RHFTextField
                name={'reply'}
                label={'Reply to Enquiry'}
                placeholder={'Reply to Enquiry'}
                required
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <LoadingButton
            variant={'outlined'}
            color={'inherit'}
            onClick={() => onClose?.()}
            disabled={isLoading}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            variant={'contained'}
            onClick={onSubmit}
            loading={isLoading}
            disabled={isLoading}
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
