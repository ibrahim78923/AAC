import { useGetApprovalTicketsByIdQuery } from '@/services/airCustomerPortal';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useApprovalDetail = () => {
  const router = useRouter();
  const { ticketId, userId }: any = router?.query;
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState<any>({});
  const setApproval = (approval: any) => {
    setSelectedApproval(approval);
    setIsConfirmModalOpen(true);
  };
  const getSingleTicketParameter = {
    pathParam: {
      ticketId,
    },
  };

  const { data, isLoading, isFetching, isError } =
    useGetApprovalTicketsByIdQuery(getSingleTicketParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!ticketId,
    });

  const setUserInfo = () => {
    const approvalData = !!userId && JSON.parse(userId);
    const approvalDetailData = {
      approvalStatus: approvalData?.approvalStatus,
      createdAt: approvalData?.createdAt,
      updatedAt: approvalData?.updatedAt,
      requesterDetails: {
        firstName: approvalData?.firstName,
        lastName: approvalData?.lastName,
        email: approvalData?.email,
      },
      ticketDetails: {
        ...data?.data?.[0],
      },
    };
    return approvalDetailData;
  };
  return {
    router,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    selectedApproval,
    setSelectedApproval,
    setApproval,
    setUserInfo,
    userId,
    isLoading,
    isFetching,
    isError,
  };
};
