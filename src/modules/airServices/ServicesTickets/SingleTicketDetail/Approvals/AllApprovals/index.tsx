import NoData from '@/components/NoData';
import { ApprovalCard } from '../ApprovalCard';
import ApiErrorState from '@/components/ApiErrorState';
import { Box } from '@mui/material';
import { useAllApprovals } from './useAllApprovals';
import { SkeletonCard } from '@/components/Skeletons/SkeletonCard';

export const AllApprovals = () => {
  const {
    showLoader,
    hasError,
    data,
    getTicketApprovalsListData,
    setApproval,
  } = useAllApprovals();

  if (showLoader)
    return <SkeletonCard gridSize={{ md: 12 }} outerPadding={{ x: 2, y: 3 }} />;
  if (hasError)
    return <ApiErrorState canRefresh refresh={getTicketApprovalsListData} />;
  if (!!!data?.length)
    return <NoData height={'30vh'} message="No approvals found" />;

  return (
    <Box maxHeight={'50vh'} overflow={'auto'}>
      {data?.map((item: any) => (
        <ApprovalCard key={item?._id} data={item} setApproval={setApproval} />
      ))}
    </Box>
  );
};
