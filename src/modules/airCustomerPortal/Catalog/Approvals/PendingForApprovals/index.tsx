import React, { Fragment } from 'react';
import { usePendingForApprovals } from './usePendingForApprovals';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { ApprovalCard } from '../ApprovalCard';
import NoData from '@/components/NoData';
import { TICKET_APPROVALS } from '@/constants/strings';
import { RequestConfirmForm } from '@/modules/airServices/ServicesTickets/SingleTicketDetail/Approvals/RequestConfirmForm';

const PendingForApprovals = () => {
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
  } = usePendingForApprovals();

  if (isLoading || isFetching) return <SkeletonForm />;
  if (isError) return <ApiErrorState />;

  return (
    <>
      {!!data?.data?.length ? (
        data?.data?.map((approval: any) => (
          <Fragment key={approval?._id}>
            <ApprovalCard
              data={approval}
              showButton={
                approval?.approvalStatus === TICKET_APPROVALS?.PENDING
              }
              showStatus={
                approval?.approvalStatus !== TICKET_APPROVALS?.PENDING
              }
              setApproval={(approvalData: any) => setApproval?.(approvalData)}
              openApprovalDetail={(data: any) => openApprovalDetail?.(data)}
            />
          </Fragment>
        ))
      ) : (
        <NoData />
      )}
      <RequestConfirmForm
        isConfirmModalOpen={isConfirmModalOpen}
        setIsConfirmModalOpen={setIsConfirmModalOpen}
        selectedApproval={selectedApproval}
        setSelectedApproval={setSelectedApproval}
        refetch={refetch}
      />
    </>
  );
};

export default PendingForApprovals;
