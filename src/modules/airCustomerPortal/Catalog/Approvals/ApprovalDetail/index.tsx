import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useApprovalDetail } from './useApprovalDetail';
import { ApprovalCard } from '../ApprovalCard';
import { ARRAY_INDEX, TICKET_APPROVALS } from '@/constants/strings';
import { DetailCard } from './DetailCard';
import { ApprovalsDataI } from '../AllApprovals/AllApprovals.interface';
import { RequestApprovalForm } from '../RequestApprovalForm';
import { AIR_CUSTOMER_PORTAL } from '@/constants/routes';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';

export const ApprovalDetail = () => {
  const {
    router,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    selectedApproval,
    setSelectedApproval,
    setApproval,
    isLoading,
    isFetching,
    isError,
    data,
    openTicketDetail,
    ticketDetails,
    refetch,
    companyId,
  } = useApprovalDetail();

  return (
    <>
      <PageTitledHeader
        title={'Approvals - View Detail'}
        canMovedBack
        moveBack={() =>
          router?.push({
            pathname: AIR_CUSTOMER_PORTAL?.APPROVALS,
            query: { ...(!!companyId && { companyId }) },
          })
        }
      />
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        hasError={isError}
        refreshApi={refetch}
        skeletonType={SKELETON_TYPES?.BASIC_CARD}
        cardSkeletonType={SKELETON_TYPES?.THREE_LAYER_LARGE_REVERSE_CARD}
      >
        <ApprovalCard
          data={data?.data}
          showButton={data?.data?.approvalStatus === TICKET_APPROVALS?.PENDING}
          showStatus={data?.data?.approvalStatus !== TICKET_APPROVALS?.PENDING}
          setApproval={(approvalData: ApprovalsDataI) =>
            setApproval?.(approvalData)
          }
        />
        <ApiRequestFlow
          showSkeleton={ticketDetails?.isLoading || ticketDetails?.isFetching}
          hasError={ticketDetails?.isError}
          refreshApi={() => ticketDetails?.refetch()}
          skeletonType={SKELETON_TYPES?.BASIC_CARD}
          cardSkeletonType={SKELETON_TYPES?.THREE_LAYER_LARGE_REVERSE_CARD}
        >
          <DetailCard
            data={ticketDetails?.data?.data?.[ARRAY_INDEX?.ZERO]}
            approvalInfo={data?.data}
            openTicketDetail={(data: any) => openTicketDetail?.(data)}
          />
        </ApiRequestFlow>
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
