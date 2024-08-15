import CommonDrawer from '@/components/CommonDrawer';

import React from 'react';

import { Box, Divider, Grid, Typography } from '@mui/material';

import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from '@/constants';
import { fullName } from '@/utils/avatarUtils';
import { usePrintTicket } from './usePrintTicket';
import { SingleTicketDetailPortalComponentPropsI } from '../SingleTicketDetail/SingleTicketDetails.interface';

export const PrintTicket = (props: SingleTicketDetailPortalComponentPropsI) => {
  const { isPortalOpen } = props;

  const { onSubmit, onClose, data, printDataField } = usePrintTicket(props);

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
          TIcket ID: {data?.data?.[0]?.ticketIdNumber}
        </Typography>
        <Typography
          variant="body1"
          fontWeight={600}
          sx={{ wordBreak: 'break-all' }}
        >
          {'  '}
          Subject : {data?.data?.[0]?.subject}
        </Typography>
        <Typography variant="body3">by </Typography>
        <Typography variant="body3" fontWeight={'bold'}>
          {fullName(
            data?.data?.[0]?.requesterDetails?.firstName,
            data?.data?.[0]?.requesterDetails?.lastName,
          ) ?? '-'}{' '}
        </Typography>
        <Typography variant="body3">
          ({data?.data?.[0]?.requesterDetails?.email ?? '-'} ) on{' '}
        </Typography>
        <Typography variant="body3" fontWeight={'bold'}>
          {dayjs(data?.data?.[0]?.requesterDetails?.createdAt)?.format(
            DATE_TIME_FORMAT?.DDMYHMA,
          ) ?? '-'}
          ,{' '}
        </Typography>{' '}
        {!!data?.data?.[0]?.source && (
          <>
            <Typography variant="body3">via </Typography>
            <Typography variant="body3" fontWeight={'bold'}>
              {data?.data?.[0]?.source ?? '-'}
            </Typography>
          </>
        )}
        <Typography variant="h6">
          Requestor For :{' '}
          <Typography variant="h4" component={'span'}>
            {fullName(
              data?.data?.[0]?.requesterDetails?.firstName,
              data?.data?.[0]?.requesterDetails?.lastName,
            ) ?? '-'}{' '}
            <Typography variant="body3" component={'span'}>
              ({data?.data?.[0]?.requesterDetails?.email ?? '-'} )
            </Typography>
          </Typography>
        </Typography>
        <Divider sx={{ marginTop: '1rem', marginBottom: '1rem' }} />
        <Typography variant="h4"> TICKET PROPERTIES </Typography>
        <Grid container mt={1}>
          {printDataField?.map((item: any) => (
            <Grid key={item?.id} xs={12} lg={3.5}>
              <Box display={'flex'} flexDirection={'row'}>
                <Box display={'flex'} flexDirection={'column'}>
                  <Typography key={item?.id} variant="h6" fontWeight={'bold'}>
                    {item?.heading}
                  </Typography>
                  <Typography key={item?.id} variant="body1">
                    {item?.text}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ marginTop: '2rem' }} />
        <Typography variant="h4"> DESCRIPTION</Typography>
        <Typography
          variant="h6"
          dangerouslySetInnerHTML={
            { __html: data?.data?.[0]?.description } ?? '-'
          }
        />{' '}
        <Divider sx={{ marginTop: '2rem' }} />
      </Box>
    </CommonDrawer>
  );
};
