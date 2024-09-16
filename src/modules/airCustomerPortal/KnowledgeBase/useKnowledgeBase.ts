import { NextRouter, useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { useGetKnowledgeBaseFolderQuery } from '@/services/airCustomerPortal/KnowledgeBase';
import { newTicketsDropdownDynamic } from '../Tickets/ReportIssue/ReportIssue.data';
import {
  getActiveAccountSession,
  getCustomerPortalPermissions,
  getCustomerPortalStyling,
  getSession,
} from '@/utils';
import { ARRAY_INDEX } from '@/constants/strings';
import { AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS } from '@/constants/permission-keys';

export const useKnowledgeBase = () => {
  const router: NextRouter = useRouter();
  const [openReportAnIssueModal, setOpenReportAnIssueModal] =
    useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const customerPortalPermissions = getCustomerPortalPermissions();
  const customerPortalStyling = getCustomerPortalStyling();
  const product = useMemo(() => getActiveAccountSession(), []);
  const session: any = getSession();
  const sessionId = session?.user?.companyId;
  const companyIdStorage = product?.company?._id;
  const sessionUserId = session?.user?._id;
  const sessionOrganizationId = session?.user?.organization?._id;

  const { companyId } = router?.query;
  const decryptedId = useMemo(() => {
    const id = Array.isArray(companyId)
      ? companyId[ARRAY_INDEX?.ZERO]
      : companyId;
    return atob(id ?? '');
  }, [companyId]);

  const apiDataParameter = {
    queryParams: {
      search,
      userId: sessionUserId,
      companyId: decryptedId || companyIdStorage || sessionId,
      organizationId: sessionOrganizationId,
    },
  };

  const { data, isLoading, isFetching, isError, refetch } =
    useGetKnowledgeBaseFolderQuery(apiDataParameter, {
      refetchOnMountOrArgChange: true,
    });

  const knowledgeBaseFolderData = data?.data;

  const newTicketsDropdown = newTicketsDropdownDynamic?.(
    setOpenReportAnIssueModal,
    router,
  );

  const reportAnIssuePermission = customerPortalPermissions?.includes(
    AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_SUBMIT_TICKET_BY_EVERYONE,
  );

  return {
    openReportAnIssueModal,
    setOpenReportAnIssueModal,
    knowledgeBaseFolderData,
    isLoading,
    isFetching,
    isError,
    setSearch,
    newTicketsDropdown,
    refetch,
    sessionUserId,
    customerPortalStyling,
    reportAnIssuePermission,
  };
};
