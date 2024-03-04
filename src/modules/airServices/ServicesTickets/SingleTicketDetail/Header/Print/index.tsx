import CommonDrawer from '@/components/CommonDrawer';

import React from 'react';

import { usePrintDrawer } from './usePrint';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { printData } from './print.data';

export const PrintDrawer = (props: any) => {
  const { onSubmit, isPrintDrawerOpen, onClose } = usePrintDrawer(props);
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
            31/03/2023 ,{' '}
            <Typography variant="body3" component={'span'}>
              11:54
            </Typography>
          </Typography>
          <Typography variant="body3">
            https://airapplecartt.atlassian.net/browse/STDAT-11
          </Typography>
        </Box>
        <Typography variant="h5" marginTop={1}>
          asdsa{' '}
          <Typography variant="h5" component={'span'} marginLeft={1}>
            {' '}
            #INC-18
          </Typography>
        </Typography>
        <Typography variant="body3">by</Typography>
        <Typography variant="body3" fontWeight={'bold'}>
          azfar ahmed{' '}
        </Typography>
        <Typography variant="body3">(dihosB02BD@huvackq.com) on </Typography>
        <Typography variant="body3" fontWeight={'bold'}>
          Tue,28,Mar 11:22 AM
        </Typography>{' '}
        <Typography variant="body3">via </Typography>
        <Typography variant="body3" fontWeight={'bold'}>
          Phone
        </Typography>
        <Typography variant="h6">
          Requestor For :{' '}
          <Typography variant="h4" component={'span'}>
            azfar ahmed{' '}
            <Typography variant="body3" component={'span'}>
              (dihosB02BD@huvackq.com)
            </Typography>
          </Typography>
        </Typography>
        <Divider sx={{ marginTop: '1rem', marginBottom: '1rem' }} />
        <Typography variant="h4"> TICKET PROPERTIES</Typography>
        <Grid container mt={1}>
          {printData?.map((item) => (
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
        <Typography variant="h6"> dsadas</Typography>
        <Divider sx={{ marginTop: '2rem' }} />
      </Box>
    </CommonDrawer>
  );
};
