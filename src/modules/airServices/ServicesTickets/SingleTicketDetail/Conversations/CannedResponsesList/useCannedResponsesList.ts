import { PAGINATION } from '@/config';
import { setIsResponsePortalClose } from '@/redux/slices/airServices/ticket-conversation/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useGetServicesTicketsConversationCannedResponsesListsQuery } from '@/services/airServices/tickets/single-ticket-details/conversation';
import { useState } from 'react';

export const useCannedResponsesList = () => {
  const dispatch = useAppDispatch();
  const isResponsePortalOpen = useAppSelector(
    (state) => state?.servicesTicketConversation?.isResponsePortalOpen,
  );
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<string>('');

  const getCannedResponsesForConversationParameter = {
    queryParams: {
      page,
      limit: pageLimit,
      search,
    },
  };

  const { data, isLoading, isFetching, isError, refetch } =
    useGetServicesTicketsConversationCannedResponsesListsQuery(
      getCannedResponsesForConversationParameter,
      {
        refetchOnMountOrArgChange: true,
      },
    );

  const closeModal = () => {
    dispatch(setIsResponsePortalClose());
  };

  const handleSearch = (searchValue: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearch(searchValue);
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
    isResponsePortalOpen,
    handleSearch,
  };
};
