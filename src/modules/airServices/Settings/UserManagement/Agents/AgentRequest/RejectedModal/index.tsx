import { AlertModalCloseIcon } from '@/assets/icons';
import { FormProvider } from '@/components/ReactHookForm';
import {
  Box,
  Button,
  Dialog,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { rejectedModalField } from './RejectedModal.data';
import { useRejectedModal } from './useRejectedModal';

const RejectedModal = (props: any) => {
  const { openRejectedModal } = props;
  const { handleCloseModal, onSubmit, rejectedRequestMethods } =
    useRejectedModal(props);
  return (
    <>
      <Dialog fullWidth open={openRejectedModal} onClose={handleCloseModal}>
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
            >
              <Typography variant="h4">Rejected</Typography>
              <IconButton
                onClick={handleCloseModal}
                style={{ cursor: 'pointer' }}
              >
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
            <Box display={'flex'} justifyContent={'flex-end'} gap={1} pt={1}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Box>
          </Box>
        </FormProvider>
      </Dialog>
    </>
  );
};

export default RejectedModal;
