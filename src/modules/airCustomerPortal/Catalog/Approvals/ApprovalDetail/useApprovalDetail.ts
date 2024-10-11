import { AIR_CUSTOMER_PORTAL } from '@/constants';
import {
  useGetCustomerPortalCatalogTicketApprovalDetailsByIdQuery,
  useGetCustomerPortalCatalogTicketDetailsByIdQuery,
} from '@/services/airCustomerPortal/catalog';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useApprovalDetail = () => {
  const router = useRouter();
  const { approvalId, ticketId } = router?.query;
  const companyId = router?.query?.companyId;
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
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

  const { data, isLoading, isFetching, isError, refetch } =
    useGetCustomerPortalCatalogTicketApprovalDetailsByIdQuery(
      getSingleTicketApprovalParameter,
      {
        refetchOnMountOrArgChange: true,
        skip: !!!approvalId,
      },
    );

  const getSingleTicketParameter = {
    pathParams: {
      id: ticketId,
    },
  };

  const ticketDetails = useGetCustomerPortalCatalogTicketDetailsByIdQuery(
    getSingleTicketParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!ticketId,
    },
  );

  const openTicketDetail = (data: any) => {
    router?.push({
      pathname: AIR_CUSTOMER_PORTAL?.SINGLE_TICKETS,
      query: {
        id: data?._id,
        ...(!!companyId && { companyId }),
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
    refetch,
    companyId,
  };
};
