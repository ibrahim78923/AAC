import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useRequestConfirmForm } from './useRequestConfirmForm';
import { AlertModalCloseIcon } from '@/assets/icons';
import { LoadingButton } from '@mui/lab';
import { TICKET_APPROVALS } from '@/constants/strings';

export const RequestConfirmForm = (props: any) => {
  const { isConfirmModalOpen, selectedApproval } = props;
  const {
    handleSubmit,
    submitRequestConfirm,
    methods,
    setModalClose,
    patchApprovalTicketsStatus,
  } = useRequestConfirmForm(props);
  return (
    <Dialog
      fullWidth
      open={isConfirmModalOpen}
      onClose={() => setModalClose()}
      maxWidth={'sm'}
    >
      <DialogTitle>
        <Box
          display={'flex'}
          gap={1}
          flexWrap={'wrap'}
          justifyContent={'space-between'}
        >
          <Typography variant="formTopHeading" color="slateBlue.main">
            {selectedApproval?.state === TICKET_APPROVALS?.APPROVE
              ? 'Approve'
              : 'Reject'}
          </Typography>
          <AlertModalCloseIcon
            onClick={() => setModalClose()}
            style={{ cursor: 'pointer' }}
          />
        </Box>
      </DialogTitle>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(submitRequestConfirm)}
      >
        <DialogContent>
          <RHFTextField
            name="reason"
            multiline
            minRows={7}
            fullWidth
            placeholder="Add Your Remarks here"
            label="Remarks"
          />
        </DialogContent>
        <DialogActions>
          <Box display={'flex'} gap={1} flexWrap={'wrap'}>
            <LoadingButton
              type="button"
              variant="outlined"
              color="secondary"
              disabled={patchApprovalTicketsStatus?.isLoading}
              onClick={() => setModalClose()}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              variant="contained"
              color={
                selectedApproval?.state === TICKET_APPROVALS?.APPROVE
                  ? 'primary'
                  : 'error'
              }
              loading={patchApprovalTicketsStatus?.isLoading}
              type="submit"
            >
              {selectedApproval?.state === TICKET_APPROVALS?.APPROVE
                ? 'Approve'
                : 'Reject'}
            </LoadingButton>
          </Box>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};
