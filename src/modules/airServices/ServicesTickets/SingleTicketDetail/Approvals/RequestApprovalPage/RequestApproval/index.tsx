import NoData from '@/components/NoData';
import { ApprovalCard } from '../../ApprovalCard';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { useRequestApprovals } from './useRequestApproval';
import { Box } from '@mui/material';
import { RequestApprovalPagePropsI } from '../../Approvals.interface';

const RequestApproval = (props: RequestApprovalPagePropsI) => {
  const { setApproval, updateRequestApprovalStatus } = props;
  const { data, isLoading, isFetching, isError, refetch } =
    useRequestApprovals();

  if (isLoading || isFetching) return <SkeletonForm />;
  if (isError) return <ApiErrorState canRefresh refresh={() => refetch?.()} />;

  return (
    <Box maxHeight={'50vh'} overflow={'auto'}>
      {!!data?.data?.length ? (
        data?.data?.map((item: any) => (
          <ApprovalCard
            key={item?._id}
            data={item}
            setApproval={(item: any) => setApproval?.(item)}
            getUpdateStatus={(item: any) => updateRequestApprovalStatus?.(item)}
          />
        ))
      ) : (
        <NoData height={'50vh'} />
      )}
    </Box>
  );
};

export default RequestApproval;
