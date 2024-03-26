import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { AlertModalCloseIcon } from '@/assets/icons';
import { useShareSingleTicket } from './useShareSingleTicket';
import { LoadingButton } from '@mui/lab';
import { singleTicketShareDataArray } from './ShareSingleTicket.data';

export const ShareSingleTicket = (props: any) => {
  const { openShareModal, setOpenShareModal } = props;
  const { methods, handleSubmit, onSubmit, handleClose } =
    useShareSingleTicket(props);

  return (
    <Dialog
      open={openShareModal}
      onClose={() => setOpenShareModal(false)}
      fullWidth
      maxWidth={'sm'}
    >
      <DialogTitle>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          paddingBottom={'1rem'}
          flexWrap={'wrap'}
        >
          <Typography variant="h5">Share</Typography>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setOpenShareModal(false);
            }}
          >
            <AlertModalCloseIcon />
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            {singleTicketShareDataArray?.map((item: any) => (
              <Grid item xs={12} key={item?.id}>
                <item.component {...item?.componentProps} size="small" />
              </Grid>
            ))}
          </Grid>
          <Box
            display={'flex'}
            justifyContent={'flex-end'}
            flexWrap={'wrap'}
            gap={1}
          >
            <LoadingButton
              variant="outlined"
              color="secondary"
              onClick={handleClose}
            >
              Cancel
            </LoadingButton>
            <LoadingButton variant="contained" type="submit">
              OK
            </LoadingButton>
          </Box>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
