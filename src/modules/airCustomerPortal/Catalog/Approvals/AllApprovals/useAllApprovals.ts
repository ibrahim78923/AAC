import { NextRouter, useRouter } from 'next/router';
import { useState } from 'react';
import { AllApprovalsPropsI, ApprovalsDataI } from './AllApprovals.interface';
import { useGetCustomerPortalCatalogPendingForApprovalsTicketsQuery } from '@/services/airCustomerPortal/catalog';
import { AIR_CUSTOMER_PORTAL } from '@/constants/routes';

export const useAllApprovals = (props: AllApprovalsPropsI) => {
  const { approvalStatus } = props;
  const router: NextRouter = useRouter();
  const companyId = router?.query?.companyId;
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [selectedApproval, setSelectedApproval] = useState<any>({});

  const setApproval = (approval: ApprovalsDataI) => {
    setSelectedApproval(approval);
    setIsConfirmModalOpen(true);
  };

  const getPendingForApprovalsTicketsParameter = {
    queryParams: {
      approvalStatus: approvalStatus,
    },
  };

  const { data, isLoading, isFetching, isError, refetch } =
    useGetCustomerPortalCatalogPendingForApprovalsTicketsQuery(
      getPendingForApprovalsTicketsParameter,
      {
        refetchOnMountOrArgChange: true,
      },
    );
  const openApprovalDetail = (data: ApprovalsDataI) => {
    router?.push({
      pathname: AIR_CUSTOMER_PORTAL?.APPROVALS_DETAIL,
      query: {
        approvalId: data?._id,
        ticketId: data?.ticketId,
        ...(!!companyId && { companyId }),
      },
    });
  };

  const showLoader = isLoading || isFetching;

  return {
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
    showLoader,
  };
};
