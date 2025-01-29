import { AIR_CUSTOMER_PORTAL } from '@/constants/routes';
import { TICKET_APPROVALS } from '@/constants/strings';
import { useGetCustomerPortalDashboardPendingForApprovalsTicketsQuery } from '@/services/airCustomerPortal';
import { useRouter } from 'next/router';
import { ApprovalsDataI } from '../../Catalog/Approvals/AllApprovals/AllApprovals.interface';

export const usePendingApprovals = () => {
  const router = useRouter();
  const getCustomerPortalPendingForApprovalsTicketsParameter = {
    queryParams: {
      approvalStatus: TICKET_APPROVALS?.RECEIVED,
    },
  };

  const companyId = router?.query?.companyId;
  const { data, isLoading, isFetching, isError, refetch } =
    useGetCustomerPortalDashboardPendingForApprovalsTicketsQuery(
      getCustomerPortalPendingForApprovalsTicketsParameter,
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

  return {
    data,
    isLoading,
    isFetching,
    isError,
    router,
    refetch,
    companyId,
    openApprovalDetail,
  };
};
