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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useApproveForm } from './useApproveForm';

export const ApproveForm = ({ approvalId }: any) => {
  const {
    approveDialog,
    setApproveDialog,
    methods,
    handleSubmit,
    onSubmit,
    patchRequestApprovalStatus,
  } = useApproveForm(approvalId);
  return (
    <>
      <Button
        variant="outlined"
        sx={{ mx: 2 }}
        color="success"
        onClick={() => setApproveDialog(true)}
        startIcon={<CheckCircleIcon />}
      >
        Approve
      </Button>
      <Dialog
        open={approveDialog}
        onClose={() => setApproveDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          <Grid
            container
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography variant="h4">Approved</Typography>
            <CloseIcon
              sx={{ color: 'custom.darker', cursor: 'pointer' }}
              onClick={() => setApproveDialog(false)}
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
                  label="Reason For Approval"
                  required
                />
              </Grid>

              <Grid item xs={12} textAlign={'end'}>
                <Button
                  variant="outlined"
                  sx={{ mx: 2 }}
                  onClick={() => setApproveDialog(false)}
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
