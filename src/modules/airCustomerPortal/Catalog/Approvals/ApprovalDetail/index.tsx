import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useApprovalDetail } from './useApprovalDetail';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { ApprovalCard } from '../ApprovalCard';
import { TICKET_APPROVALS } from '@/constants/strings';
import { RequestConfirmForm } from '@/modules/airServices/ServicesTickets/SingleTicketDetail/Approvals/RequestConfirmForm';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { DetailCard } from './DetailCard';

export const ApprovalDetail = () => {
  const {
    router,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    selectedApproval,
    setSelectedApproval,
    setApproval,
    setUserInfo,
    isLoading,
    isFetching,
    isError,
  } = useApprovalDetail();

  if (isLoading || isFetching) return <SkeletonForm />;
  if (isError) return <ApiErrorState />;

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
        data={setUserInfo?.()}
        showButton={
          setUserInfo?.()?.approvalStatus === TICKET_APPROVALS?.PENDING
        }
        showStatus={
          setUserInfo?.()?.approvalStatus !== TICKET_APPROVALS?.PENDING
        }
        setApproval={(approvalData: any) => setApproval?.(approvalData)}
      />

      <RequestConfirmForm
        isConfirmModalOpen={isConfirmModalOpen}
        setIsConfirmModalOpen={setIsConfirmModalOpen}
        selectedApproval={selectedApproval}
        setSelectedApproval={setSelectedApproval}
      />
      <DetailCard data={setUserInfo?.()} />
    </>
  );
};
