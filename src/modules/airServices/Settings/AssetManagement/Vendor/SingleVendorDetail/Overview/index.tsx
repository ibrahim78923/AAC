import { Box, Typography } from '@mui/material';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { useOverview } from './useOverview';

export const Overview = () => {
  const { isLoading, overviewData, isFetching } = useOverview();

  if (isFetching || isLoading) return <SkeletonTable />;

  return (
    <Box bgcolor={'primary.lighter'} borderRadius={2}>
      {Object?.entries(overviewData)?.map(([keys, values]: any) => (
        <Box key={keys} display={'flex'}>
          <Typography
            variant={'body2'}
            fontWeight={500}
            p={2}
            color={'grey.600'}
            minWidth={'25%'}
          >
            {keys}:
          </Typography>
          <Typography
            variant={'body2'}
            p={2}
            color={'grey.900'}
            fontWeight={500}
          >
            {values}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
