import { useRejectStatus } from './useRejectStatus';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Close } from '@mui/icons-material';

export const RejectStatus = (props: any) => {
  const {
    handleClose,
    open,
    handleSubmit,
    onSubmit,
    methods,
    patchContractRejectStatus,
  } = useRejectStatus(props);
  return (
    <Dialog open={open} onClose={handleClose} maxWidth={'sm'} fullWidth>
      <DialogTitle>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          gap={1}
          flexWrap={'wrap'}
          mb={1.5}
        >
          <Typography variant="h4">Rejected</Typography>
          <IconButton onClick={handleClose}>
            <Close sx={{ color: 'custom.darker' }} />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField
            multiline
            rows={3}
            name="reason"
            label="Reason For Rejection"
            required
          />
          <DialogActions sx={{ paddingTop: `0rem !important` }}>
            <LoadingButton
              className="small"
              variant="outlined"
              color="inherit"
              onClick={handleClose}
              disabled={patchContractRejectStatus?.isLoading}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              className="small"
              loading={patchContractRejectStatus?.isLoading}
              variant="contained"
              type="submit"
            >
              Submit
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
