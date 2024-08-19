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
import { TicketActionComponentPropsI } from '../TicketsLists/TicketsLists.interface';
import CloseIcon from '@mui/icons-material/Close';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';

export const MoveTickets = (props: TicketActionComponentPropsI) => {
  const { isPortalOpen } = props;
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
      open={isPortalOpen?.isOpen as boolean}
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
            mb={1.5}
          >
            <Typography variant="h4" color="slateBlue.main">
              Move
            </Typography>
            <CloseIcon
              sx={{ color: 'custom.darker', cursor: 'pointer' }}
              onClick={() => closeMoveTicketsModal?.()}
            />
          </Box>
        </DialogTitle>
        <DialogContent>
          <br />
          <Grid container spacing={4}>
            {moveTicketsFormFields?.map((item: ReactHookFormFieldsI) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ paddingTop: `0rem !important` }}>
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
