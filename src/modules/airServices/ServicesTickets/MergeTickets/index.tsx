import { AlertModalCloseIcon } from '@/assets/icons';
import { FormProvider } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import { useMergedTickets } from './useMergeTickets';
import { fullName } from '@/utils/avatarUtils';
import { formatTimeDifference } from '@/utils/dateTime';

export const MergeTickets = (props: any) => {
  const theme = useTheme();
  const { isMergedTicketsModalOpen, singleTicketDetail } = props;
  const {
    mergedTicketsFormMethod,
    closeMergedTicketsModal,
    handleSubmit,
    submitMergedTicketsForm,
    mergeTicketsFormFields,
    postMergeTicketsStatus,
  } = useMergedTickets(props);

  return (
    <Dialog
      open={isMergedTicketsModalOpen}
      onClose={() => closeMergedTicketsModal?.()}
      fullWidth
      maxWidth={'sm'}
    >
      <FormProvider
        methods={mergedTicketsFormMethod}
        onSubmit={handleSubmit(submitMergedTicketsForm)}
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
                Merge
              </Typography>
            </Box>
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => closeMergedTicketsModal?.()}
            >
              <AlertModalCloseIcon />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <br />
          <Grid container spacing={1}>
            {mergeTicketsFormFields?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'}>
                  {item?.heading ? item?.heading : null}
                </item.component>
              </Grid>
            ))}
          </Grid>
          <br />
          <Typography
            variant="h6"
            mb={0.5}
            fontWeight={600}
            color="slateBlue.main"
          >
            Primary
          </Typography>
          <Box
            padding={1.5}
            borderRadius={2}
            border={`1px solid ${theme?.palette?.custom?.off_white_three}`}
          >
            <Box
              display={'flex'}
              alignItems={'center'}
              gap={2}
              flexWrap={'wrap'}
            >
              <Box
                display={'flex'}
                gap={1}
                flexWrap={'wrap'}
                alignItems={'center'}
              >
                <Avatar
                  sx={{
                    bgcolor: theme?.palette?.blue?.main,
                    width: 28,
                    height: 28,
                  }}
                  variant="rounded"
                >
                  <Typography variant="body2" textTransform={'uppercase'}>
                    {singleTicketDetail?.departmentDetails?.name?.[0] ?? '-'}
                  </Typography>
                </Avatar>
                <Typography variant="h6" color="secondary">
                  {singleTicketDetail?.ticketIdNumber}
                </Typography>
              </Box>
              <Box
                display={'flex'}
                gap={1}
                flexWrap={'wrap'}
                alignItems={'center'}
              >
                <Typography
                  color={'grey.0'}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  Request for{' '}
                  {fullName(
                    singleTicketDetail?.requesterDetails?.firstName,
                    singleTicketDetail?.requesterDetails?.lastName,
                  )}
                </Typography>
                <Typography
                  component={'span'}
                  color="secondary"
                  variant="body1"
                  sx={{ wordBreak: 'break-all' }}
                >
                  {singleTicketDetail?.subject}
                </Typography>
              </Box>
            </Box>
            <Typography color={'grey.0'} my={0.5}>
              From :{' '}
              <Typography component={'span'} color="secondary" variant="body1">
                {fullName(
                  singleTicketDetail?.requesterDetails?.firstName,
                  singleTicketDetail?.requesterDetails?.lastName,
                )}
              </Typography>
            </Typography>
            <Typography color="grey.0">
              Created :{' '}
              <Typography component={'span'} color="secondary" variant="body1">
                {formatTimeDifference(singleTicketDetail?.createdAt)}
              </Typography>
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{ '&.MuiDialogActions-root': { padding: '1.5rem !important' } }}
        >
          <LoadingButton
            disabled={postMergeTicketsStatus?.isLoading}
            variant="outlined"
            color="secondary"
            onClick={() => closeMergedTicketsModal?.()}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            loading={postMergeTicketsStatus?.isLoading}
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
