import { TICKET_APPROVALS } from '@/constants/strings';
import { useGetCustomerPortalDashboardPendingForApprovalsTicketsQuery } from '@/services/airCustomerPortal';
import { useRouter } from 'next/router';

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

  return {
    data,
    isLoading,
    isFetching,
    isError,
    router,
    refetch,
    companyId,
  };
};
