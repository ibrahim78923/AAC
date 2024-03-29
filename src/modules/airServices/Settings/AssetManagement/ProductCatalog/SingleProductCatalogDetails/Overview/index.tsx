import { Box, Typography } from '@mui/material';
import { Fragment } from 'react';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { useOverview } from './useOverview';
import ApiErrorState from '@/components/ApiErrorState';

export const Overview = () => {
  const { isLoading, dataArray, isFetching, isError } = useOverview();

  if (isError) return <ApiErrorState />;

  if (isLoading || isFetching) return <SkeletonTable />;

  return (
    <Fragment>
      <Typography variant={'h6'} fontWeight={600}>
        Product Overview
      </Typography>
      <Box bgcolor={'primary.lighter'} borderRadius={2} p={2} my={2}>
        {dataArray?.map((item: any) => (
          <Box key={item} display={'flex'}>
            <Typography
              variant={'body2'}
              fontWeight={500}
              p={2}
              color={'grey.600'}
              minWidth={'25%'}
            >
              {Object?.keys?.(item)?.[0]}:
            </Typography>
            <Typography
              variant={'body2'}
              p={2}
              color={'grey.900'}
              fontWeight={500}
            >
              {item?.[Object?.keys?.(item)?.[0]]}
            </Typography>
          </Box>
        ))}
      </Box>
    </Fragment>
  );
};
