import { PAGINATION } from '@/config';
import { useGetAllArticlesForConversationQuery } from '@/services/airServices/tickets/single-ticket-details/conversation';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useArticlesList = (props: any) => {
  const { setIsModalOpen } = props;
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<any>('');

  const router = useRouter();
  const getAllArticlesForConversationParameter = {
    queryParams: {
      page,
      limit: pageLimit,
      search,
    },
  };

  const { data, isLoading, isFetching, isError } =
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
  };
};
