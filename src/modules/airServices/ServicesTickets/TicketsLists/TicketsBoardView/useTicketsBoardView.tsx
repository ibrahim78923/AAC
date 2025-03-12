import { useEffect, useMemo, useState } from 'react';
import { useGetTicketList } from '../../TicketsServicesHooks/useGetTicketList';
import { useAppDispatch } from '@/redux/store';
import {
  setPage,
  setPageDecrement,
  setPageIncrement,
  setPageLimit,
} from '@/redux/slices/airServices/tickets/slice';
import { groupArrayByKey } from '@/utils/data-transformation';
import { TICKET_STATUS } from '@/constants/services';
import { useUpdateBulkServicesTicketsMutation } from '@/services/airServices/tickets';

export const useTicketsBoardView = () => {
  const [ticketLists, setTicketLists] = useState<any>({});
  const {
    getTicketsListData,
    lazyGetTicketsStatus,
    page,
    pageLimit,
    search,
    filterTicketLists,
  } = useGetTicketList();

  useEffect(() => {
    getTicketsListData?.();
  }, [page, pageLimit, search, filterTicketLists]);

  const HEAD_STATUS = [
    { heading: 'Open', be: TICKET_STATUS?.OPEN },
    { heading: 'Resolved', be: TICKET_STATUS?.RESOLVED },
    { heading: 'Pending', be: TICKET_STATUS?.PENDING },
    { heading: 'Closed', be: TICKET_STATUS?.CLOSED },
  ];

  const dispatch = useAppDispatch();

  const handleSetPage = (newPage: any) => {
    dispatch(setPage(newPage));
  };

  const handleSetPageLimit = (newPageLimit: any) => {
    dispatch(setPageLimit(newPageLimit));
  };

  const increment = () => dispatch(setPageIncrement?.());
  const decrement = () => dispatch(setPageDecrement?.());

  const tickets = lazyGetTicketsStatus?.data?.data?.tickets || [];

  const groupTicketsByStatus = useMemo(() => {
    const groupedTickets = groupArrayByKey(tickets, 'status', {
      filter: true,
      includeData: [
        TICKET_STATUS?.OPEN,
        TICKET_STATUS?.RESOLVED,
        TICKET_STATUS?.PENDING,
        TICKET_STATUS?.CLOSED,
      ],
    });
    return groupedTickets;
  }, [tickets]);

  useEffect(() => {
    setTicketLists(groupTicketsByStatus);
  }, [groupTicketsByStatus]);

  const [patchBulkUpdateTicketsTrigger, patchBulkUpdateTicketsStatus] =
    useUpdateBulkServicesTicketsMutation();

  const onDragEnd = async (result: any) => {
    if (!result?.destination) return;
    if (result?.destination?.droppableId === result?.source?.droppableId)
      return;
    const oldTicketLists = ticketLists;
    const draggedItemId = result?.draggableId;
    const newStatus = result?.destination?.droppableId;
    const sourceDroppableId = result?.source?.droppableId;

    const destinationArray: any = ticketLists?.[newStatus] ?? [];
    const sourceArray: any = ticketLists?.[sourceDroppableId];
    const elementToAdd = sourceArray?.find(
      (item: any) => item?._id === draggedItemId,
    );
    const modifiedSourceArray = sourceArray?.filter(
      (item: any) => item?._id !== draggedItemId,
    );

    const modifiedDestinationArray = [...destinationArray, elementToAdd];
    const updatedTicketLists = {
      ...ticketLists,
      [newStatus]: modifiedDestinationArray,
      [sourceDroppableId]: modifiedSourceArray,
    };

    setTicketLists(updatedTicketLists);
    const apiDataParameter = {
      queryParams: {
        ids: draggedItemId,
      },
      body: {
        status: newStatus,
      },
    };

    try {
      await patchBulkUpdateTicketsTrigger(apiDataParameter)?.unwrap();
      await getTicketsListData?.();
    } catch (error: any) {
      setTicketLists(oldTicketLists);
    }
  };
  const apiCallSuccess = patchBulkUpdateTicketsStatus?.isSuccess;

  return {
    HEAD_STATUS,
    lazyGetTicketsStatus,
    page,
    handleSetPageLimit,
    handleSetPage,
    getTicketsListData,
    decrement,
    increment,
    onDragEnd,
    ticketLists,
    apiCallSuccess,
  };
};
