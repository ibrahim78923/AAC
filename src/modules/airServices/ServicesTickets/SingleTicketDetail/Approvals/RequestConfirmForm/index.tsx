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
  const { handleSubmit, submitRequestConfirm, methods, setModalClose } =
    useRequestConfirmForm(props);
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
          <Typography variant="h5" color="slateBlue.main">
            Approval
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
          <Box mt={1}></Box>
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
              onClick={() => setModalClose()}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              variant="contained"
              color={
                selectedApproval?.state === TICKET_APPROVALS?.APPROVE
                  ? 'success'
                  : 'error'
              }
              type="submit"
            >
              {selectedApproval?.state}
            </LoadingButton>
          </Box>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};
