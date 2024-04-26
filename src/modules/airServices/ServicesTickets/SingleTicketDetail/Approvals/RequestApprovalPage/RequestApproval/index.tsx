import NoData from '@/components/NoData';
import { ApprovalCard } from '../../ApprovalCard';

import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { useRequestApprovals } from './useRequestApproval';
import { Box } from '@mui/material';

const RequestApproval = (props: any) => {
  const { setApproval, updateRequestApprovalStatus } = props;
  const { data, isLoading, isFetching, isError } = useRequestApprovals();

  if (isLoading || isFetching) return <SkeletonForm />;
  if (isError) return <ApiErrorState />;

  return (
    <Box maxHeight={'50vh'} overflow={'auto'}>
      {!!data?.data?.length ? (
        data?.data?.map((item: any) => (
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

export default RequestApproval;
