import { useRejectStatus } from './useRejectStatus';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
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
          gap={1}
          alignItems={'center'}
          flexWrap={'wrap'}
          justifyContent={'space-between'}
        >
          <Typography variant="h4">Rejected</Typography>
          <Close
            sx={{ color: 'custom.darker', cursor: 'pointer' }}
            onClick={handleClose}
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
              color="inherit"
              onClick={handleClose}
              disabled={patchContractRejectStatus?.isLoading}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              loading={patchContractRejectStatus?.isLoading}
              variant="contained"
              type="submit"
            >
              Submit
            </LoadingButton>
          </Box>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
