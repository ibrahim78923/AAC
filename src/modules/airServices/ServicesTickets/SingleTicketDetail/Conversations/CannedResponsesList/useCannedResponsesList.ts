import { PAGINATION } from '@/config';
import { useGetCannedResponsesForConversationQuery } from '@/services/airServices/tickets/single-ticket-details/conversation';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useCannedResponsesList = (props: any) => {
  const { setIsModalOpen } = props;
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<string>('');

  const router = useRouter();
  const getCannedResponsesForConversationParameter = {
    queryParams: {
      page,
      limit: pageLimit,
      search,
    },
  };

  const { data, isLoading, isFetching, isError, refetch } =
    useGetCannedResponsesForConversationQuery(
      getCannedResponsesForConversationParameter,
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
