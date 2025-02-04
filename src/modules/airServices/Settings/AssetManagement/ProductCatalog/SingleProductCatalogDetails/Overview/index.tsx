import { Box, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useOverview } from './useOverview';
import { ARRAY_INDEX } from '@/constants/strings';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';
import { HtmlRenderer } from '@/components/DataDisplay/HtmlRenderer';

export const Overview = () => {
  const { isLoading, dataArray, isFetching, isError, refetch } = useOverview();

  return (
    <ApiRequestFlow
      showSkeleton={isLoading || isFetching}
      hasError={isError}
      refreshApi={refetch}
      skeletonType={SKELETON_TYPES?.BARS}
    >
      <Typography variant={'h6'} fontWeight={600}>
        Product Overview
      </Typography>
      <Box bgcolor={'primary.lighter'} borderRadius={2} p={2} my={2}>
        {dataArray?.map((item: any) => (
          <Box key={uuidv4()} display={'flex'}>
            <Typography
              variant={'body2'}
              fontWeight={500}
              p={2}
              color={'grey.600'}
              minWidth={'25%'}
            >
              {Object?.keys?.(item)?.[ARRAY_INDEX?.ZERO]}:
            </Typography>
            {item?.Description ? (
              <Box px={2} py={0.5}>
                <HtmlRenderer
                  maxHeight="none"
                  description={item?.Description}
                />
              </Box>
            ) : (
              <Typography
                variant={'body2'}
                p={2}
                color={'grey.900'}
                fontWeight={500}
              >
                {item?.[Object?.keys?.(item)?.[0]]}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </ApiRequestFlow>
  );
};
