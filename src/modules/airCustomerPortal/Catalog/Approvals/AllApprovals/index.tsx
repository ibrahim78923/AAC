import { Fragment } from 'react';
import { TICKET_APPROVALS } from '@/constants/strings';
import { useAllApprovals } from './useAllApprovals';
import { ApprovalCard } from '../ApprovalCard';
import NoData from '@/components/NoData';
import ApiErrorState from '@/components/ApiErrorState';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { AllApprovalsPropsI, ApprovalsDataI } from './AllApprovals.interface';
import { RequestApprovalForm } from '../RequestApprovalForm';

const AllApprovals = (props: AllApprovalsPropsI) => {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    selectedApproval,
    setSelectedApproval,
    setApproval,
    openApprovalDetail,
    refetch,
  } = useAllApprovals(props);

  if (isLoading || isFetching) return <SkeletonForm />;
  if (isError) return <ApiErrorState canRefresh refresh={() => refetch?.()} />;

  return (
    <>
      {!!data?.data?.length ? (
        data?.data?.map((approval: ApprovalsDataI) => (
          <Fragment key={approval?._id}>
            <ApprovalCard
              data={approval}
              showButton={
                approval?.approvalStatus === TICKET_APPROVALS?.PENDING
              }
              showStatus={
                approval?.approvalStatus !== TICKET_APPROVALS?.PENDING
              }
              setApproval={(approvalData: ApprovalsDataI) =>
                setApproval?.(approvalData)
              }
              openApprovalDetail={(data: ApprovalsDataI) =>
                openApprovalDetail?.(data)
              }
            />
          </Fragment>
        ))
      ) : (
        <NoData />
      )}
      {isConfirmModalOpen && (
        <RequestApprovalForm
          isConfirmModalOpen={isConfirmModalOpen}
          setIsConfirmModalOpen={setIsConfirmModalOpen}
          selectedApproval={selectedApproval}
          setSelectedApproval={setSelectedApproval}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default AllApprovals;
