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
import useViewEnquiry from './useViewEnquiry';
import { IChildModalState } from '../Enquiries.interface';

export const ViewEnquiry = ({ isModalOpen, onClose }: IChildModalState) => {
  const { methods, handleSubmit, onSubmit, status } = useViewEnquiry({
    isModalOpen,
    onClose,
  });

  return (
    <Dialog open={isModalOpen?.viewOpen} onClose={() => onClose?.()} fullWidth>
      <DialogTitle
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        mb={1}
      >
        <Typography variant={'h3'} component={'div'}>
          Enquiry Comment
        </Typography>
        <CloseIcon sx={{ cursor: 'pointer' }} onClick={() => onClose?.()} />
      </DialogTitle>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ py: 0 }}>
          <Typography variant={'h6'}>
            {isModalOpen?.data?.[0]?.query}
          </Typography>

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
            disabled={status?.isLoading}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            variant={'contained'}
            type={'submit'}
            loading={status?.isLoading}
            disabled={status?.isLoading}
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};
export default ViewEnquiry;
