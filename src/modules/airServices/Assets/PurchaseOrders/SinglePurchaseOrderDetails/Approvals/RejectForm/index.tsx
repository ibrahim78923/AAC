import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import CancelIcon from '@mui/icons-material/Cancel';
import { useRejectForm } from './useRejectForm';

export const RejectForm = ({ approvalId }: any) => {
  const {
    setRejectDialog,
    rejectDialog,
    methods,
    handleSubmit,
    onSubmit,
    patchRequestApprovalStatus,
  } = useRejectForm(approvalId);
  return (
    <>
      <Button
        variant="outlined"
        color="error"
        onClick={() => setRejectDialog(true)}
        startIcon={<CancelIcon />}
      >
        Reject
      </Button>
      <Dialog
        open={rejectDialog}
        onClose={() => setRejectDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          <Grid container justifyContent={'space-between'}>
            <Typography variant="h4">Rejected</Typography>
            <CloseIcon
              sx={{ color: 'custom.darker', cursor: 'pointer' }}
              onClick={() => setRejectDialog(false)}
            />
          </Grid>
        </DialogTitle>

        <DialogContent sx={{ mt: 1 }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <RHFTextField
                  multiline
                  rows={3}
                  name="reason"
                  label="Reason For Rejection"
                  required
                />
              </Grid>

              <Grid item xs={12} textAlign={'end'}>
                <Button
                  variant="outlined"
                  sx={{ mx: 2 }}
                  onClick={() => setRejectDialog(false)}
                >
                  Cancel
                </Button>
                <LoadingButton
                  loading={patchRequestApprovalStatus?.isLoading}
                  variant="contained"
                  type="submit"
                >
                  Submit
                </LoadingButton>
              </Grid>
            </Grid>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
};
