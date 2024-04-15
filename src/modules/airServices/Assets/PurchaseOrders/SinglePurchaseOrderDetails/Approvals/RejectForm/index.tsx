import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
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
        maxWidth={'sm'}
        fullWidth
      >
        <DialogTitle>
          <Box
            justifyContent={'space-between'}
            alignItems={'center'}
            display={'flex'}
            gap={1}
            flexWrap={'wrap'}
          >
            <Typography variant="h4">Rejected</Typography>
            <CloseIcon
              sx={{ color: 'custom.darker', cursor: 'pointer' }}
              onClick={() => setRejectDialog(false)}
            />
          </Box>
        </DialogTitle>

        <DialogContent sx={{ mt: 1 }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField
              multiline
              rows={3}
              name="reason"
              label="Reason For Rejection"
              required
            />
            <Box
              display={'flex'}
              gap={1}
              alignItems={'center'}
              flexWrap={'wrap'}
              justifyContent={'flex-end'}
              mt={1}
            >
              <LoadingButton
                variant="outlined"
                onClick={() => setRejectDialog(false)}
                disabled={patchRequestApprovalStatus?.isLoading}
                color="inherit"
              >
                Cancel
              </LoadingButton>
              <LoadingButton
                loading={patchRequestApprovalStatus?.isLoading}
                variant="contained"
                type="submit"
              >
                Submit
              </LoadingButton>
            </Box>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
};
