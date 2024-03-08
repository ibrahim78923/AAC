import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useRejectStatus } from './useRejectStatus';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@/assets/icons/shared/close-icon';

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
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Grid container justifyContent={'space-between'}>
          <Typography variant="h4">Rejected</Typography>
          <CloseIcon
            sx={{ color: 'custom.darker', cursor: 'pointer' }}
            onClick={handleClose}
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
              <Button variant="outlined" sx={{ mx: 2 }} onClick={handleClose}>
                Cancel
              </Button>
              <LoadingButton
                loading={patchContractRejectStatus?.isLoading}
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
  );
};
