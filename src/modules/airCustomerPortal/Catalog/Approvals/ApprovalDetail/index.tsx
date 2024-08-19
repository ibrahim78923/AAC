import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useApprovalDetail } from './useApprovalDetail';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { ApprovalCard } from '../ApprovalCard';
import { ARRAY_INDEX, TICKET_APPROVALS } from '@/constants/strings';
import { RequestConfirmForm } from '@/modules/airServices/ServicesTickets/SingleTicketDetail/Approvals/RequestConfirmForm';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { DetailCard } from './DetailCard';
import { ApprovalsDataI } from '../AllApprovals/AllApprovals.interface';

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
  } = useApprovalDetail();

  if (isLoading || isFetching) return <SkeletonForm />;
  if (isError) return <ApiErrorState canRefresh refresh={() => refetch?.()} />;

  return (
    <>
      <PageTitledHeader
        title={'Approvals - View Detail'}
        canMovedBack
        moveBack={() =>
          router?.push({
            pathname: AIR_CUSTOMER_PORTAL?.APPROVALS,
          })
        }
      />

      <ApprovalCard
        data={data?.data}
        showButton={data?.data?.approvalStatus === TICKET_APPROVALS?.PENDING}
        showStatus={data?.data?.approvalStatus !== TICKET_APPROVALS?.PENDING}
        setApproval={(approvalData: ApprovalsDataI) =>
          setApproval?.(approvalData)
        }
      />

      {ticketDetails?.isLoading || ticketDetails?.isFetching ? (
        <SkeletonForm />
      ) : ticketDetails?.isError ? (
        <ApiErrorState canRefresh refresh={() => ticketDetails?.refetch()} />
      ) : (
        <DetailCard
          data={ticketDetails?.data?.data?.[ARRAY_INDEX?.ZERO]}
          approvalInfo={data?.data}
          openTicketDetail={(data: any) => openTicketDetail?.(data)}
        />
      )}

      {isConfirmModalOpen && (
        <RequestConfirmForm
          isConfirmModalOpen={isConfirmModalOpen}
          setIsConfirmModalOpen={setIsConfirmModalOpen}
          selectedApproval={selectedApproval}
          setSelectedApproval={setSelectedApproval}
        />
      )}
    </>
  );
};
