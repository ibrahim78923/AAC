import { PAGINATION } from '@/config';
import { ARTICLE_STATUS } from '@/constants/strings';
import { useGetServicesTicketsConversationPublishedArticlesListQuery } from '@/services/airServices/tickets/single-ticket-details/conversation';
import { getActiveAccountSession } from '@/utils';
import { useMemo, useState } from 'react';

export const useArticlesList = (props: any) => {
  const { setIsModalOpen } = props;
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<string>('');

  const product = useMemo(() => getActiveAccountSession(), []);
  const companyId = product?.company?._id ?? {};

  const getAllArticlesForConversationParameter = {
    queryParams: {
      page,
      limit: pageLimit,
      search,
      status: ARTICLE_STATUS?.PUBLISHED,
      companyId,
    },
  };

  const { data, isLoading, isFetching, isError, refetch } =
    useGetServicesTicketsConversationPublishedArticlesListQuery(
      getAllArticlesForConversationParameter,
      {
        refetchOnMountOrArgChange: true,
      },
    );

  const closeModal = () => {
    setIsModalOpen?.('');
  };

  return {
    data,
    isLoading,
    isFetching,
    isError,
    setPage,
    setPageLimit,
    setSearch,
    closeModal,
    refetch,
  };
};
