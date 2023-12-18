import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { singleTicketPopupDataArray } from './SingleTicketPopup.data';
import { AlertModalCloseIcon } from '@/assets/icons';
import { useSingleTicketPopup } from './useSingleTicketPopup';
import { LoadingButton } from '@mui/lab';

export const SingleTicketPopup = (props: any) => {
  const { openPopup, setOpenPopup } = props;
  const { methods, handleSubmit, onSubmit, handleClose } =
    useSingleTicketPopup(props);

  return (
    <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
      <DialogTitle>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          paddingBottom={'1rem'}
        >
          <Typography variant="h5">Share</Typography>
          <AlertModalCloseIcon
            onClick={() => {
              setOpenPopup(false);
            }}
            sx={{ cursor: 'pointer' }}
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            {singleTicketPopupDataArray?.map((item: any) => (
              <Grid item xs={12} key={item?.id}>
                <item.component {...item?.componentProps} />
              </Grid>
            ))}
          </Grid>
          <Box display={'flex'} justifyContent={'flex-end'} gap={1}>
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
