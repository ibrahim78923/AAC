import NoData from '@/components/NoData';
import { ApprovalCard } from '../../ApprovalCard';

import { useGetApprovalsTicketsQuery } from '@/services/airServices/tickets/single-ticket-details/approvals';
import { useRouter } from 'next/router';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';

const RequestReceivedApproval = (props: any) => {
  const { setApproval, updateRequestApprovalStatus } = props;
  const router = useRouter();
  const { ticketId } = router?.query;

  const getApprovalsTicketsParameter = {
    queryParams: {
      id: ticketId,
      approvalStatus: 'RECIEVED',
    },
  };
  const { data, isLoading, isFetching, isError } = useGetApprovalsTicketsQuery(
    getApprovalsTicketsParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!ticketId,
    },
  );

  if (isLoading || isFetching) return <SkeletonForm />;
  if (isError) return <ApiErrorState />;

  return (
    <>
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
        <NoData />
      )}
    </>
  );
};

export default RequestReceivedApproval;
