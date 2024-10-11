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
        className={'small'}
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
            <Typography variant="h4">Approved</Typography>
            <CloseIcon
              sx={{ color: 'custom.darker', cursor: 'pointer' }}
              onClick={() => setApproveDialog(false)}
            />
          </Box>
        </DialogTitle>

        <DialogContent>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField
              multiline
              rows={3}
              name="reason"
              label="Reason For Approval"
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
              <Button
                variant="outlined"
                color="inherit"
                className={'small'}
                onClick={() => setApproveDialog(false)}
                disabled={patchRequestApprovalStatus?.isLoading}
              >
                Cancel
              </Button>
              <LoadingButton
                loading={patchRequestApprovalStatus?.isLoading}
                variant="contained"
                type="submit"
                className={'small'}
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
