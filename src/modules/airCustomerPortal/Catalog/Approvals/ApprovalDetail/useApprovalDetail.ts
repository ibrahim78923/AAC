import { AIR_CUSTOMER_PORTAL } from '@/constants';
import {
  useGetTicketApprovalDetailsByIdQuery,
  useGetTicketDetailsByIdQuery,
} from '@/services/airCustomerPortal';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useApprovalDetail = () => {
  const router = useRouter();
  const { approvalId, ticketId }: any = router?.query;
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState<any>({});
  const setApproval = (approval: any) => {
    setSelectedApproval(approval);
    setIsConfirmModalOpen(true);
  };
  const getSingleTicketApprovalParameter = {
    queryParams: {
      id: approvalId,
    },
  };

  const { data, isLoading, isFetching, isError } =
    useGetTicketApprovalDetailsByIdQuery(getSingleTicketApprovalParameter, {
      refetchOnMountOrArgChange: true,
      skip: !!!approvalId,
    });

  const getSingleTicketParameter = {
    pathParams: {
      id: ticketId,
    },
  };

  const ticketDetails = useGetTicketDetailsByIdQuery(getSingleTicketParameter, {
    refetchOnMountOrArgChange: true,
    skip: !!!ticketId,
  });
  const openTicketDetail = (data: any) => {
    router?.push({
      pathname: AIR_CUSTOMER_PORTAL?.SINGLE_TICKETS,
      query: {
        id: data?._id,
      },
    });
  };
  return {
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
  };
};
