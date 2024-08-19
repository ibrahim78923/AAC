import { FormProvider } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import { useMergedTickets } from './useMergeTickets';
import { fullName } from '@/utils/avatarUtils';
import { formatTimeDifference } from '@/utils/dateTime';
import { TicketActionComponentPropsI } from '../TicketsLists/TicketsLists.interface';
import CloseIcon from '@mui/icons-material/Close';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';

export const MergeTickets = (props: TicketActionComponentPropsI) => {
  const theme = useTheme();
  const { isPortalOpen, singleTicketDetail } = props;
  const {
    mergedTicketsFormMethod,
    closeMergedTicketsModal,
    handleSubmit,
    submitMergedTicketsForm,
    mergeTicketsFormFields,
    postMergeTicketsStatus,
  }: any = useMergedTickets(props);

  return (
    <Dialog
      open={isPortalOpen?.isOpen as boolean}
      onClose={() => closeMergedTicketsModal?.()}
      fullWidth
      maxWidth={'sm'}
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
            Merge
          </Typography>
          <CloseIcon
            sx={{ color: 'custom.darker', cursor: 'pointer' }}
            onClick={() => closeMergedTicketsModal?.()}
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        <FormProvider
          methods={mergedTicketsFormMethod}
          onSubmit={handleSubmit(submitMergedTicketsForm)}
        >
          <br />
          <Grid container spacing={1}>
            {mergeTicketsFormFields?.map((item: ReactHookFormFieldsI) => (
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
          <Box
            display={'flex'}
            justifyContent={'flex-end'}
            alignItems={'center'}
            gap={1}
            mt={1}
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
          </Box>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
