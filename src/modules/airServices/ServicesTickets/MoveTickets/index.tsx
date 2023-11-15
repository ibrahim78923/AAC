import { AlertModalCloseIcon } from '@/assets/icons';
import { FormProvider } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { moveTicketsFormFields } from './MoveTickets.data';
import { v4 as uuidv4 } from 'uuid';

export const MoveTickets = (props: any) => {
  const method = useForm({
    defaultValues: {
      department: '',
      agent: '',
    },
  });
  const { isModalOpen, handleClose } = props;
  return (
    <Dialog
      open={isModalOpen}
      onClose={() => handleClose?.()}
      fullWidth
      maxWidth={'sm'}
    >
      <FormProvider methods={method}>
        <DialogTitle>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={1}
            flexWrap={'wrap'}
          >
            <Box
              display={'flex'}
              alignItems={'center'}
              gap={1}
              flexWrap={'wrap'}
            >
              <Typography variant="h3" textTransform={'capitalize'}>
                Assigned To
              </Typography>
            </Box>
            <Box sx={{ cursor: 'pointer' }} onClick={() => handleClose?.()}>
              <AlertModalCloseIcon />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <br />
          <Grid container spacing={4}>
            {moveTicketsFormFields?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{ '&.MuiDialogActions-root': { padding: '1.5rem !important' } }}
        >
          <LoadingButton
            variant="outlined"
            color="secondary"
            //   onClick={() => handleCancelBtn?.()}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            variant="contained"
            // onClick={() => handleSubmitBtn?.()}
          >
            Continue
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};
