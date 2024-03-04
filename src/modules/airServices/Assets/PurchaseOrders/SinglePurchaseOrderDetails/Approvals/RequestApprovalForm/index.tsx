import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FormProvider, RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import { useRequestApprovalForm } from './useRequestApprovalForm';

export const RequestApprovalForm = (props: any) => {
  const {
    openDialog,
    setOpenDialog,
    methods,
    handleSubmit,
    onSubmit,
    postRequestApprovalStatus,
    apiQueryAgents,
  } = useRequestApprovalForm(props);
  return (
    <Dialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>
        <Grid container justifyContent={'space-between'}>
          <Typography variant="h4">Request Approval</Typography>
          <CloseIcon
            sx={{ color: 'custom.darker', cursor: 'pointer' }}
            onClick={() => setOpenDialog(false)}
          />
        </Grid>
      </DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <RHFAutocompleteAsync
                name="approvers"
                size="small"
                placeholder="Select a User"
                label="Approvers"
                apiQuery={apiQueryAgents}
                getOptionLabel={(option: any) =>
                  `${option?.firstName} ${option?.lastName}`
                }
                required
              />
            </Grid>

            <Grid item xs={12} textAlign={'end'}>
              <LoadingButton
                variant="outlined"
                sx={{ mx: 2 }}
                onClick={() => setOpenDialog(false)}
                color={'secondary'}
              >
                Cancel
              </LoadingButton>
              <LoadingButton
                loading={postRequestApprovalStatus?.isLoading}
                variant="contained"
                type="submit"
              >
                Request
              </LoadingButton>
            </Grid>
          </Grid>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
