import { AlertModalCloseIcon } from '@/assets/icons';
import { FormProvider } from '@/components/ReactHookForm';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { rejectedModalField } from './RejectedModal.data';
import { useRejectedModal } from './useRejectedModal';
import { LoadingButton } from '@mui/lab';
import { IAgentsProps } from '../../Agents.interface';

const RejectedModal = (props: IAgentsProps) => {
  const { openRejectedModal } = props;
  const {
    handleCloseModal,
    onSubmit,
    rejectedRequestMethods,
    patchRejectRequestStatus,
  } = useRejectedModal(props);
  return (
    <>
      <Dialog
        fullWidth
        open={openRejectedModal as boolean}
        onClose={handleCloseModal}
        maxWidth={'sm'}
      >
        <FormProvider
          methods={rejectedRequestMethods}
          onSubmit={rejectedRequestMethods?.handleSubmit?.(onSubmit)}
        >
          <DialogTitle>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              mb={1}
              flexWrap="wrap"
            >
              <Typography variant="h4">Rejected</Typography>
              <IconButton onClick={handleCloseModal} sx={{ cursor: 'pointer' }}>
                <AlertModalCloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={1}>
              {rejectedModalField?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <LoadingButton
              disabled={patchRejectRequestStatus?.isLoading}
              variant="outlined"
              color="secondary"
              onClick={handleCloseModal}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              variant="contained"
              type="submit"
              disabled={patchRejectRequestStatus?.isLoading}
              loading={patchRejectRequestStatus?.isLoading}
            >
              Submit
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
};

export default RejectedModal;
