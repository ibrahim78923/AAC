import { PAGINATION } from '@/config';
import { useLazyGetCannedResponsesQuery } from '@/services/airServices/settings/agent-performance-management/canned-responses';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useCannedResponses = () => {
  const router = useRouter();
  const [openCreateNewFolderModal, setOpenCreateNewFolderModal] = useState<any>(
    { open: false, editData: null },
  );

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<any>('');
  const getCannedResponsesParam = new URLSearchParams();
  getCannedResponsesParam?.append('page', page + '');
  getCannedResponsesParam?.append('limit', pageLimit + '');
  getCannedResponsesParam?.append('search', search);
  const getCannedResponsesParameter = {
    queryParams: getCannedResponsesParam,
  };

  const [lazyGetCannedResponsesTrigger, lazyGetCannedResponsesStatus] =
    useLazyGetCannedResponsesQuery();
  const cannedResponses =
    lazyGetCannedResponsesStatus?.data?.data?.cannedresponses;
  const cannedResponsesMetaData =
    lazyGetCannedResponsesStatus?.data?.data?.meta;
  const getCannedResponsesListData = async () => {
    try {
      await lazyGetCannedResponsesTrigger(
        getCannedResponsesParameter,
      )?.unwrap();
    } catch (error: any) {}
  };
  useEffect(() => {
    getCannedResponsesListData();
  }, [search, page, pageLimit]);
  const convertToHyphenCase = (str: string): string => {
    return str
      ?.split(' ')
      ?.map((word) => word?.toLowerCase())
      ?.join('-');
  };
  return {
    router,
    convertToHyphenCase,
    setOpenCreateNewFolderModal,
    openCreateNewFolderModal,
    search,
    setSearch,
    cannedResponses,
    lazyGetCannedResponsesStatus,
    setPageLimit,
    setPage,
    pageLimit,
    page,
    cannedResponsesMetaData,
  };
};
