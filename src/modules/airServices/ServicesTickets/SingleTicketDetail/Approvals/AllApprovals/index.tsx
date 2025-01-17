import { ApprovalCard } from '../ApprovalCard';
import { Box } from '@mui/material';
import { useAllApprovals } from './useAllApprovals';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';

export const AllApprovals = () => {
  const {
    showLoader,
    hasError,
    data,
    getTicketApprovalsListData,
    setApproval,
  } = useAllApprovals();

  return (
    <ApiRequestFlow
      showSkeleton={showLoader}
      hasError={hasError}
      refreshApi={getTicketApprovalsListData}
      hasNoData={!data?.length}
      noDataMessage="No approvals found"
      skeletonType={SKELETON_TYPES?.BASIC_CARD}
      cardSkeletonType={SKELETON_TYPES?.THREE_LAYER_BIG_LARGE_CARD}
    >
      <Box maxHeight={'50vh'} overflow={'auto'}>
        {data?.map((item: any) => (
          <ApprovalCard key={item?._id} data={item} setApproval={setApproval} />
        ))}
      </Box>
    </ApiRequestFlow>
  );
};
