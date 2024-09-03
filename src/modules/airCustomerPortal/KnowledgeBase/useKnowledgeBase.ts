import { NextRouter, useRouter } from 'next/router';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { useState } from 'react';
import { useGetKnowledgeBaseFolderQuery } from '@/services/airCustomerPortal/KnowledgeBase';
import { newTicketsDropdownDynamic } from '../Tickets/ReportIssue/ReportIssue.data';

export const useKnowledgeBase = () => {
  const router: NextRouter = useRouter();
  const [openReportAnIssueModal, setOpenReportAnIssueModal] =
    useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const handleKnowledgeBaseDetail = (folderId: any) => {
    router?.push({
      pathname: AIR_CUSTOMER_PORTAL?.KNOWLEDGE_BASE_DETAIL,
      query: { folderId },
    });
  };

  const apiDataParameter = {
    queryParams: {
      search,
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
    handleKnowledgeBaseDetail,
    newTicketsDropdown,
    refetch,
  };
};
