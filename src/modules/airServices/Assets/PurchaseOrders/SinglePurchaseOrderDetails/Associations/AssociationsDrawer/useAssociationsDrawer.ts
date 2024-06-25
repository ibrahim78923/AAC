import { PAGINATION } from '@/config';
import { useLazyGetTicketsQuery } from '@/services/airServices/tickets';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { usePostRemoveAssociateTicketsMutation } from '@/services/airServices/tickets/single-ticket-details/association';
import { ASSOCIATIONS_API_PARAMS_FOR } from '@/constants';

export const useAssociationsDrawer = (props: any) => {
  const { open, setDrawerOpen } = props;
  const searchParams = useSearchParams();
  const purchaseOrderId = searchParams?.get('purchaseOrderId');
  const [selectedTicketList, setSelectedTicketList] = useState<any>([]);

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<any>('');

  const [lazyGetTicketsTrigger, lazyGetTicketsStatus] =
    useLazyGetTicketsQuery();

  const [postRemoveAssociateTicketsTrigger, postRemoveAssociateTicketsStatus] =
    usePostRemoveAssociateTicketsMutation();

  const tickets = lazyGetTicketsStatus?.data?.data;
  const metaData = lazyGetTicketsStatus?.data?.data?.meta;

  const getValueTicketsListData = async () => {
    const getTicketsParam = new URLSearchParams();
    getTicketsParam?.append('ticketType', 'SR');

    getTicketsParam?.append('page', page + '');
    getTicketsParam?.append('limit', pageLimit + '');
    getTicketsParam?.append('search', search);
    const getTicketsParameter = {
      queryParams: getTicketsParam,
    };
    try {
      await lazyGetTicketsTrigger(getTicketsParameter)?.unwrap();
      setSelectedTicketList([]);
    } catch (error: any) {
      setSelectedTicketList([]);
    }
  };

  const onSubmit = async () => {
    const body = {
      recordId: purchaseOrderId,
      recordType: ASSOCIATIONS_API_PARAMS_FOR?.PURCHASE_ORDER,
      operation: ASSOCIATIONS_API_PARAMS_FOR?.ADD,
      ticketsIds: selectedTicketList?.map((ticket: any) => ticket?._id),
    };
    const postRemoveAssociateTicketsParameter = {
      body,
    };

    try {
      await postRemoveAssociateTicketsTrigger(
        postRemoveAssociateTicketsParameter,
      )?.unwrap();
      successSnackbar('Ticket(s) Associated Successfully!');
      setSelectedTicketList([]);
      setDrawerOpen(false);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  useEffect(() => {
    getValueTicketsListData();
  }, [search, page, pageLimit]);

  return {
    lazyGetTicketsStatus,
    search,
    setSearch,
    pageLimit,
    setPageLimit,
    page,
    setPage,
    open,
    setDrawerOpen,
    setSelectedTicketList,
    selectedTicketList,
    tickets,
    metaData,
    onSubmit,
    postRemoveAssociateTicketsStatus,
  };
};
