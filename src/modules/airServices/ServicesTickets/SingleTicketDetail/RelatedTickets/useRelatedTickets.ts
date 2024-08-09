import { useEffect, useState } from 'react';
import { useLazyGetChildTicketsQuery } from '@/services/airServices/tickets/single-ticket-details/related-tickets';
import {
  columnsFunction,
  relatedTicketsActionDropdownFunction,
} from './RelatedTickets.data';
import { PAGINATION } from '@/config';
import { useRouter } from 'next/router';
import { buildQueryParams } from '@/utils/api';
import { getActivePermissionsSession } from '@/utils';
import { ARRAY_INDEX, SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import {
  RelatedTicketsIsPortalOpenI,
  RelatedTicketsPortalComponentPropsI,
} from './RelatedTickets.interface';

export const useRelatedTickets = () => {
  const router = useRouter();
  const ticketId = router?.query?.ticketId;
  const [isPortalOpen, setIsPortalOpen] = useState<RelatedTicketsIsPortalOpenI>(
    {},
  );
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);
  const overallPermissions = getActivePermissionsSession();

  const [selectedChildTickets, setSelectedChildTickets] = useState([]);
  const [
    lazyGetChildTicketsTrigger,
    { data, isLoading, isFetching, isError, isSuccess },
  ] = useLazyGetChildTicketsQuery();

  const getChildTicketsListData = async (currentPage = page) => {
    const additionalParams = [
      ['page', currentPage + ''],
      ['limit', pageLimit + ''],
    ];

    const getChildTicketsParam = buildQueryParams(additionalParams);

    const getChildTicketsParameter = {
      queryParams: getChildTicketsParam,
      pathParam: {
        id: ticketId,
      },
    };

    try {
      await lazyGetChildTicketsTrigger(getChildTicketsParameter)?.unwrap();
      setSelectedChildTickets([]);
    } catch (error: any) {
      setSelectedChildTickets([]);
    }
  };

  const relatedTicketsColumns = columnsFunction(
    data?.data?.tickets?.length > SELECTED_ARRAY_LENGTH?.ONE
      ? data?.data?.tickets
      : !!data?.data?.tickets?.[ARRAY_INDEX?.ZERO]?.childTicketDetails?._id
        ? data?.data?.tickets
        : [],
    selectedChildTickets,
    setSelectedChildTickets,
    router,
    overallPermissions,
  );

  useEffect(() => {
    getChildTicketsListData();
  }, [page, pageLimit]);

  const relatedTicketsActionDropdown = relatedTicketsActionDropdownFunction(
    setIsPortalOpen,
    selectedChildTickets,
  );

  const portalComponentProps: RelatedTicketsPortalComponentPropsI = {
    isPortalOpen: isPortalOpen,
    setIsPortalOpen: setIsPortalOpen,
    selectedChildTickets: selectedChildTickets,
    setSelectedChildTickets: setSelectedChildTickets,
    setPage: setPage,
    totalRecords: data?.data?.tickets?.length,
    page: page,
    getChildTicketsListData: getChildTicketsListData,
    data: selectedChildTickets,
    childTicketId: selectedChildTickets?.[ARRAY_INDEX?.ZERO],
  };

  return {
    selectedChildTickets,
    relatedTicketsColumns,
    setPage,
    data,
    setPageLimit,
    setSelectedChildTickets,
    relatedTicketsActionDropdown,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    setIsPortalOpen,
    isPortalOpen,
    portalComponentProps,
  };
};
