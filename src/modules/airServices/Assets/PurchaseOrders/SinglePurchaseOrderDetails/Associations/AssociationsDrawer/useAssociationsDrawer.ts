import { PAGINATION } from '@/config';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useLazyGetTicketsQuery } from '@/services/airServices/tickets';
import { useSearchParams } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { AssociationsDrawerPropsI } from './AssociationsDrawer.interface';
import { usePostAssociationsMutation } from '@/services/airServices/assets/purchase-orders/single-purchase-order-details/associations';

export const useAssociationsDrawer = (props: AssociationsDrawerPropsI) => {
  const { open, setDrawerOpen } = props;
  const searchParams = useSearchParams();
  const purchaseOrderId = searchParams.get('id');
  const [selectedTicketList, setSelectedTicketList] = useState<any>([]);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<any>('');
  const [lazyGetTicketsTrigger, lazyGetTicketsStatus] =
    useLazyGetTicketsQuery();
  const [postAssociationTrigger, postAssociationStatus] =
    usePostAssociationsMutation();
  const tickets = lazyGetTicketsStatus?.data?.data?.tickets;
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
      error?.data?.data?.message &&
        enqueueSnackbar(error?.data?.message ?? 'Error', {
          variant: NOTISTACK_VARIANTS?.ERROR,
        });
      setSelectedTicketList([]);
    }
  };

  const onSubmit = async () => {
    const postAssociationParameter = {
      purchaseOrderId,
      body: {
        ticketsIds: selectedTicketList?.map((ticket: any) => ticket?._id),
      },
    };
    try {
      const response = await postAssociationTrigger(
        postAssociationParameter,
      )?.unwrap();
      enqueueSnackbar(response?.message ?? 'Tickets Associated Successfully!', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setSelectedTicketList([]);
    } catch (error) {
      enqueueSnackbar('Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
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
    postAssociationStatus,
  };
};
