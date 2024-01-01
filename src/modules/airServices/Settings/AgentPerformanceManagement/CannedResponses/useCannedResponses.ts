import { PAGINATION } from '@/config';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useLazyGetCannedResponsesQuery } from '@/services/airServices/settings/agent-performance-management/canned-responses';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
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
      const response = await lazyGetCannedResponsesTrigger(
        getCannedResponsesParameter,
      )?.unwrap();
      enqueueSnackbar(
        response?.message ?? 'Canned Responses Retrieved successfully',
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Error', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
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
