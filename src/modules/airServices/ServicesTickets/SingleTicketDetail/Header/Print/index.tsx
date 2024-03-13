import CommonDrawer from '@/components/CommonDrawer';

import React from 'react';

import { usePrintDrawer } from './usePrint';
import { Box, Divider, Grid, Typography } from '@mui/material';

import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from '@/constants';
import { fullName } from '@/utils/avatarUtils';

export const PrintDrawer = (props: any) => {
  const { onSubmit, isPrintDrawerOpen, onClose, data, printDataField, router } =
    usePrintDrawer(props);
  return (
    <CommonDrawer
      isDrawerOpen={isPrintDrawerOpen}
      onClose={onClose}
      title=""
      submitHandler={onSubmit}
      footer={true}
      isOk={true}
      okText="Print"
    >
      <Box flexWrap={'wrap'}>
        <Box
          justifyContent={'space-between'}
          display={'flex'}
          flexDirection={'row'}
        >
          <Typography variant="body3">
            {dayjs(data?.data?.[0]?.requesterDetails?.createdAt)?.format(
              DATE_TIME_FORMAT?.DDMYHMA,
            ) ?? '-'}
            ,{' '}
          </Typography>
          <Typography variant="body3">
            https://airapplecartt.atlassian.net/browse/STDAT-11
            {router?.pathname}
          </Typography>
        </Box>
        <Typography variant="h5" marginTop={1}>
          {data?.data?.[0]?.subject}{' '}
          <Typography variant="h5" component={'span'} marginLeft={1}>
            {' '}
            {data?.data?.[0]?.ticketIdNumber}
          </Typography>
        </Typography>
        <Typography variant="body3">by</Typography>
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
        <Typography variant="body3">via </Typography>
        <Typography variant="body3" fontWeight={'bold'}>
          {data?.data?.[0]?.source ?? '-'}
        </Typography>
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
        <Typography variant="h4"> TICKET PROPERTIES</Typography>
        <Grid container mt={1}>
          {printDataField?.map((item) => (
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
