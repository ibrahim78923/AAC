import { Box } from '@mui/material';
import { Timeline } from './Timeline';
import { useContractHistory } from './useContractHistory';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { pxToRem } from '@/utils/getFontValue';
import { SKELETON_TYPES } from '@/constants/mui-constant';

export const ContractHistory = () => {
  const { contractHistory, isLoading, isFetching, isError, refetch } =
    useContractHistory();

  return (
    <>
      <Box
        sx={{
          border: '1px solid',
          borderColor: 'custom.off_white_three',
          borderRadius: 2,
          p: 2,
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            minWidth: pxToRem(600),
            overflow: 'auto',
          }}
        >
          <ApiRequestFlow
            showSkeleton={isLoading || isFetching}
            hasNoData={!contractHistory?.length}
            hasError={isError}
            refreshApi={refetch}
            noDataMessage="No contract history found"
            skeletonType={SKELETON_TYPES?.BASIC_CARD}
            cardSkeletonType={
              SKELETON_TYPES?.SMALL_HORIZONTAL_TWO_LAYER_CIRCULAR_CARD
            }
          >
            {contractHistory?.map((singleActivity: any, index: number) => (
              <Timeline
                data={singleActivity}
                key={singleActivity?._id || index}
                timelineIndex={index}
              />
            ))}
          </ApiRequestFlow>
        </Box>
      </Box>
    </>
  );
};
