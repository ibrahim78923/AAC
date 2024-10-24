import CommonDrawer from '@/components/CommonDrawer';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { DATE_TIME_FORMAT } from '@/constants';
import { fullName } from '@/utils/avatarUtils';
import { usePrintTicket } from './usePrintTicket';
import { otherDateFormat } from '@/lib/date-time';

export const PrintTicket = () => {
  const {
    onSubmit,
    onClose,
    singleTicketDetail,
    printDataField,
    isPortalOpen,
  } = usePrintTicket();

  return (
    <CommonDrawer
      isDrawerOpen={isPortalOpen?.isOpen as boolean}
      onClose={onClose}
      title=""
      submitHandler={onSubmit}
      footer
      isOk
      okText="Print"
    >
      <Box>
        <Typography variant="body1" fontWeight={600}>
          {' '}
          TIcket ID: {singleTicketDetail?.ticketIdNumber}
        </Typography>
        <Typography
          variant="body1"
          fontWeight={600}
          sx={{ wordBreak: 'break-all' }}
        >
          {'  '}
          Subject : {singleTicketDetail?.subject}
        </Typography>
        <Typography variant="body3">by </Typography>
        <Typography variant="body3" fontWeight={'bold'}>
          {fullName(
            singleTicketDetail?.requesterDetails?.firstName,
            singleTicketDetail?.requesterDetails?.lastName,
          ) ?? '-'}{' '}
        </Typography>
        <Typography variant="body3">
          ({singleTicketDetail?.requesterDetails?.email ?? '-'} ) on{' '}
        </Typography>
        <Typography variant="body3" fontWeight={'bold'}>
          {!!singleTicketDetail?.requesterDetails?.createdAt
            ? otherDateFormat(
                singleTicketDetail?.requesterDetails?.createdAt,
                DATE_TIME_FORMAT?.DDMYHMA,
              )
            : '---'}
        </Typography>{' '}
        {!!singleTicketDetail?.source && (
          <>
            <Typography variant="body3">via </Typography>
            <Typography variant="body3" fontWeight={'bold'}>
              {singleTicketDetail?.source ?? '-'}
            </Typography>
          </>
        )}
        <Typography variant="h6">
          Requestor For :{' '}
          <Typography variant="h4" component={'span'}>
            {fullName(
              singleTicketDetail?.requesterDetails?.firstName,
              singleTicketDetail?.requesterDetails?.lastName,
            ) ?? '-'}{' '}
            <Typography variant="body3" component={'span'}>
              ({singleTicketDetail?.requesterDetails?.email ?? '-'} )
            </Typography>
          </Typography>
        </Typography>
        <Divider sx={{ marginTop: '1rem', marginBottom: '1rem' }} />
        <Typography variant="h4"> TICKET PROPERTIES </Typography>
        <Grid container mt={1}>
          {printDataField?.map((item: any) => (
            <Grid item key={item?.id} xs={12} lg={3.5}>
              <Box display={'flex'} flexDirection={'row'}>
                <Box display={'flex'} flexDirection={'column'}>
                  <Typography variant="h6" fontWeight={'bold'}>
                    {item?.heading}
                  </Typography>
                  <Typography variant="body1">{item?.text}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ marginTop: '2rem' }} />
        <Typography variant="h4"> DESCRIPTION</Typography>
        {!!singleTicketDetail?.description ? (
          <Typography
            variant="h6"
            dangerouslySetInnerHTML={{
              __html: singleTicketDetail?.description,
            }}
          />
        ) : (
          '---'
        )}
        <Divider sx={{ marginTop: '2rem' }} />
      </Box>
    </CommonDrawer>
  );
};
