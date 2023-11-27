import { Box, Typography } from '@mui/material';
import { Fragment } from 'react';
import { OverviewData } from './Overview.data';

export const Overview = () => {
  return (
    <Fragment>
      <Typography variant={'h5'}>Product Overview</Typography>
      <Box bgcolor={'primary.lighter'} borderRadius={2} p={2} my={2}>
        {OverviewData?.map((item: any) => (
          <Box key={item} display={'flex'}>
            <Typography
              variant={'body1'}
              fontWeight={600}
              p={2}
              color={'grey.600'}
              minWidth={'20%'}
            >
              {Object?.keys?.(item)?.[0]}:
            </Typography>
            <Typography variant={'body1'} p={2} color={'grey.900'}>
              {item?.[Object?.keys?.(item)?.[0]]}
            </Typography>
          </Box>
        ))}
      </Box>
    </Fragment>
  );
};
