import { AlertModalCloseIcon } from '@/assets/icons';
import { FormProvider } from '@/components/ReactHookForm';
import {
  Box,
  Dialog,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { rejectedModalField } from './RejectedModal.data';
import { useRejectedModal } from './useRejectedModal';
import { LoadingButton } from '@mui/lab';

const RejectedModal = (props: any) => {
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
        open={openRejectedModal?.val}
        onClose={handleCloseModal}
        maxWidth={'sm'}
      >
        <FormProvider
          methods={rejectedRequestMethods}
          onSubmit={rejectedRequestMethods?.handleSubmit?.(onSubmit)}
        >
          <Box width={'100%'} p={2}>
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
            <Grid container spacing={4}>
              {rejectedModalField?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              ))}
            </Grid>
            <Divider />
            <Box
              display={'flex'}
              justifyContent={'flex-end'}
              gap={1}
              pt={1}
              flexWrap="wrap"
            >
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
            </Box>
          </Box>
        </FormProvider>
      </Dialog>
    </>
  );
};

export default RejectedModal;
