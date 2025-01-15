import { Fragment } from 'react';
import { TICKET_APPROVALS } from '@/constants/strings';
import { useAllApprovals } from './useAllApprovals';
import { ApprovalCard } from '../ApprovalCard';
import { AllApprovalsPropsI, ApprovalsDataI } from './AllApprovals.interface';
import { RequestApprovalForm } from '../RequestApprovalForm';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';

const AllApprovals = (props: AllApprovalsPropsI) => {
  const {
    data,
    isError,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    selectedApproval,
    setSelectedApproval,
    setApproval,
    openApprovalDetail,
    refetch,
    showLoader,
  } = useAllApprovals(props);

  return (
    <>
      <ApiRequestFlow
        showSkeleton={showLoader}
        hasError={isError}
        refreshApi={refetch}
        skeletonType={SKELETON_TYPES?.BASIC_CARD}
        cardSkeletonType={SKELETON_TYPES?.THREE_LAYER_LARGE_REVERSE_CARD}
        hasNoData={!data?.data?.length}
        NoDataMessage={'No approval found'}
      >
        {data?.data?.map((approval: ApprovalsDataI) => (
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
        ))}
      </ApiRequestFlow>
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
