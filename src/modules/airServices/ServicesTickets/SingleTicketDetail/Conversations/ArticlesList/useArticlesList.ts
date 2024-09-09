import { PAGINATION } from '@/config';
import { ARRAY_INDEX, ARTICLE_STATUS } from '@/constants/strings';
import useAuth from '@/hooks/useAuth';
import { useGetAllArticlesForConversationQuery } from '@/services/airServices/tickets/single-ticket-details/conversation';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useArticlesList = (props: any) => {
  const { setIsModalOpen } = props;
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<string>('');

  const auth: any = useAuth();
  const { _id: companyId } =
    auth?.product?.accounts?.[ARRAY_INDEX?.ZERO]?.company;

  const router = useRouter();
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
