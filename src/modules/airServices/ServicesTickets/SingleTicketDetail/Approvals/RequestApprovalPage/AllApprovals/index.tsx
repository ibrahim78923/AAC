import NoData from '@/components/NoData';
import { ApprovalCard } from '../../ApprovalCard';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { useAllApprovals } from './useAllApprovals';
import { Box } from '@mui/material';

export const AllApprovals = (props: any) => {
  const { setApproval, updateRequestApprovalStatus } = props;
  const { data, isLoading, isFetching, isError } = useAllApprovals();

  if (isLoading || isFetching) return <SkeletonForm />;
  if (isError) return <ApiErrorState />;

  return (
    <Box maxHeight={'50vh'} overflow={'auto'}>
      {!!data?.length ? (
        data?.map((item: any) => (
          <ApprovalCard
            key={item?._id}
            data={item}
            setApproval={(x: any) => setApproval?.(x)}
            getUpdateStatus={(item: any) => updateRequestApprovalStatus?.(item)}
          />
        ))
      ) : (
        <NoData height={'50vh'} />
      )}
    </Box>
  );
};
