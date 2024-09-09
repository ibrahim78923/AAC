import { NextRouter, useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { useGetKnowledgeBaseFolderQuery } from '@/services/airCustomerPortal/KnowledgeBase';
import { newTicketsDropdownDynamic } from '../Tickets/ReportIssue/ReportIssue.data';
import { getActiveProductSession, getSession } from '@/utils';
import { ARRAY_INDEX } from '@/constants/strings';

export const useKnowledgeBase = () => {
  const router: NextRouter = useRouter();
  const [openReportAnIssueModal, setOpenReportAnIssueModal] =
    useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const product = getActiveProductSession();
  const session: any = getSession();
  const sessionId = session?.user?.companyId;
  const companyIdStorage = product?.accounts?.[ARRAY_INDEX?.ZERO]?.company?._id;

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
      companyId: decryptedId || companyIdStorage || sessionId,
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
  };
};
