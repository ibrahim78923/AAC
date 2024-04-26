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
import { useMoveTickets } from './useMoveTickets';

export const MoveTickets = (props: any) => {
  const { isMoveTicketsModalOpen } = props;
  const {
    moveTicketsFormMethod,
    closeMoveTicketsModal,
    handleSubmit,
    submitMoveTicketsForm,
    moveTicketsFormFields,
    putTicketStatus,
  } = useMoveTickets(props);
  return (
    <Dialog
      open={isMoveTicketsModalOpen}
      onClose={() => closeMoveTicketsModal?.()}
      fullWidth
      maxWidth={'sm'}
    >
      <FormProvider
        methods={moveTicketsFormMethod}
        onSubmit={handleSubmit(submitMoveTicketsForm)}
      >
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
                Move
              </Typography>
            </Box>
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => closeMoveTicketsModal?.()}
            >
              <AlertModalCloseIcon />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <br />
          <Grid container spacing={4}>
            {moveTicketsFormFields?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
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
            onClick={() => closeMoveTicketsModal?.()}
            disabled={putTicketStatus?.isLoading}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            loading={putTicketStatus?.isLoading}
            variant="contained"
            type="submit"
          >
            Continue
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};
