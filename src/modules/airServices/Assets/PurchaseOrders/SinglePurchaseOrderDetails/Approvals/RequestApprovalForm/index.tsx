import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
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
    productId,
  } = useRequestApprovalForm(props);

  return (
    <Dialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={'xs'}
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
          <Typography variant="h4">Request Approval</Typography>
          <CloseIcon
            sx={{ color: 'custom.darker', cursor: 'pointer' }}
            onClick={() => setOpenDialog(false)}
          />
        </Box>
      </DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
            externalParams={{ productId, admin: true }}
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
              onClick={() => setOpenDialog(false)}
              color={'secondary'}
              className={'small'}
              disabled={postRequestApprovalStatus?.isLoading}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              loading={postRequestApprovalStatus?.isLoading}
              variant="contained"
              type="submit"
              className={'small'}
            >
              Request
            </LoadingButton>
          </Box>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
