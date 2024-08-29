import { PAGINATION } from '@/config';
import { ARTICLE_STATUS } from '@/constants/strings';
import { useGetAllArticlesForConversationQuery } from '@/services/airServices/tickets/single-ticket-details/conversation';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useArticlesList = (props: any) => {
  const { setIsModalOpen } = props;
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<string>('');

  const router = useRouter();
  const getAllArticlesForConversationParameter = {
    queryParams: {
      page,
      limit: pageLimit,
      search,
      status: ARTICLE_STATUS?.PUBLISHED,
    },
  };

  const { data, isLoading, isFetching, isError, refetch } =
    useGetAllArticlesForConversationQuery(
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
    router,
    setPage,
    setPageLimit,
    setSearch,
    closeModal,
    refetch,
  };
};
