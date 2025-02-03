import { Box, Typography } from '@mui/material';
import { useOverview } from './useOverview';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';
import { DynamicFormDataDisplay } from '@/components/DynamicForm/DynamicFormDataDisplay';

export const Overview = () => {
  const { isLoading, overviewData, isFetching, isError, refetch } =
    useOverview();

  return (
    <ApiRequestFlow
      showSkeleton={isFetching || isLoading}
      skeletonType={SKELETON_TYPES?.BARS}
      hasError={isError}
      refreshApi={refetch}
      length={6}
    >
      <Box bgcolor={'primary.lighter'} borderRadius={2}>
        {Object?.entries(overviewData)?.map(([key, value]: any) => (
          <Box key={key} display={'flex'}>
            <Typography
              variant={'body2'}
              fontWeight={500}
              p={2}
              color={'grey.600'}
              minWidth={'25%'}
            >
              {key}:
            </Typography>
            <Typography
              variant={'body2'}
              p={2}
              color={'grey.900'}
              fontWeight={500}
              textTransform={'capitalize'}
            >
              <DynamicFormDataDisplay value={value} />
            </Typography>
          </Box>
        ))}
      </Box>
    </ApiRequestFlow>
  );
};
