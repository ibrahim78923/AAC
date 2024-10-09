import { PAGINATION } from '@/config';
import { ARTICLE_STATUS } from '@/constants/strings';
import { setIsResponsePortalClose } from '@/redux/slices/airServices/ticket-conversation/slice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useGetServicesTicketsConversationPublishedArticlesListQuery } from '@/services/airServices/tickets/single-ticket-details/conversation';
import { getActiveAccountSession } from '@/utils';
import { useMemo, useState } from 'react';

export const useArticlesList = () => {
  const dispatch = useAppDispatch();
  const isResponsePortalOpen = useAppSelector(
    (state) => state?.servicesTicketConversation?.isResponsePortalOpen,
  );
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
