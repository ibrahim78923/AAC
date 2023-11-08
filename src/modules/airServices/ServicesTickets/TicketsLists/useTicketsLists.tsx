import { useState, useEffect } from 'react';
import {
  TABLE_CONSTANTS,
  ticketsActionDropdownFunction,
  ticketsListsColumnFunction,
  ticketsListsData,
} from './TicketsLists.data';
import { CustomizeTicketsColumn } from '../CustomizeTicketsColumn';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material';
import { TicketsFilter } from '../TicketsFilter';
import CreateTicket from '../CreateTicket';
import { enqueueSnackbar } from 'notistack';
import { useGetTicketsQuery } from '@/services/airServices/tickets';

export const useTicketsLists = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [ticketList, setTicketList] = useState([]);
  const [selectedTicketList, setSelectedTicketList] = useState();

  const [search, setSearch] = useState<any>(undefined);
  const [columnsName, setColumnsName] = useState(['status', 'subject']);

  const getTicketsParameter = {
    queryParams: {
      page: 1,
      limit: 10,
      search,
      columnsName,
    },
  };

  const { data } = useGetTicketsQuery(getTicketsParameter);

  useEffect(() => {
    setTicketList(ticketsListsData);
  }, [ticketsListsData]);

  // const nop = columnsPersist?.map(
  //   (obj: any) =>
  //     Object?.entries(obj)?.reduce((acc: any, [key, value]: any) => {
  //       if (
  //         typeof value === 'object' &&
  //         value !== null &&
  //         !Array.isArray(value)
  //       )
  //         return { ...acc, ...value };
  //       else return { [key]: value, ...acc };
  //     }, {}),
  // );
  // const object1 = Object?.entries(columnsPersist?.[0])?.reduce(
  //   (acc: any, [key, value]: any) => {
  //     if (typeof value === 'object' && value !== null && !Array.isArray(value))
  //       return { ...acc, ...value };
  //     else return { [key]: value, ...acc };
  //   },
  //   {},
  // );
  // const object2 = Object?.entries(columnsPersist?.[0])?.reduce(
  //   (x: any, y: any) => {
  //     const [k, v] = y;
  //     return { ...x, [k]: true };
  //   },
  //   {},
  // );

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const theme = useTheme();
  const router = useRouter();

  const handleChange = (value: any, event: any) => {
    setTicketList(
      (preVal: any) =>
        preVal?.map((item: any) =>
          value?.ticketId === item?.ticketId
            ? { ...item, [event?.name]: [event?.value] }
            : item,
        ),
    );
  };

  const ticketsListsColumnPersist = ticketsListsColumnFunction(
    theme,
    router,
    ticketsListsData,
    selectedTicketList,
    setSelectedTicketList,
    handleChange,
  );
  // const newColumns = ticketsListsColumnPersist?.filter(
  //   (x: any) => object2[x?.id],
  // );

  const [ticketsListsColumn, setTicketsListsColumn] = useState(
    ticketsListsColumnFunction(
      theme,
      router,
      ticketsListsData,
      selectedTicketList,
      setSelectedTicketList,
      handleChange,
    ),
    // newColumns,
  );
  const drawerComponent: any = {
    [TABLE_CONSTANTS?.CUSTOMIZE_COLUMN]: (
      <CustomizeTicketsColumn
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        ticketsListsColumnPersist={ticketsListsColumnPersist}
        ticketsListsColumn={ticketsListsColumn}
        setTicketsListsColumn={setTicketsListsColumn}
      />
    ),

    [TABLE_CONSTANTS?.FILTER_DATA]: (
      <TicketsFilter
        setIsDrawerOpen={setIsDrawerOpen}
        isDrawerOpen={isDrawerOpen}
      />
    ),
    [TABLE_CONSTANTS?.CREATE_NEW_TICKET]: (
      <CreateTicket
        setIsDrawerOpen={setIsDrawerOpen}
        isDrawerOpen={isDrawerOpen}
      />
    ),
  };

  const openDrawer = (tableActionQuery: any) => {
    router?.push({
      pathname: router?.pathname,
      query: {
        ...router?.query,
        tableAction: tableActionQuery,
      },
    });
    setTimeout(() => {
      setIsDrawerOpen(true);
    }, 100);
  };

  const markTicketAsClose = () => {
    enqueueSnackbar('Ticket marked as close', { variant: 'success' });
  };

  const markTicketAsSpam = () => {
    enqueueSnackbar('Ticket marked as spam', { variant: 'success' });
  };

  const deleteTicket = () => {
    enqueueSnackbar('Ticket deleted successfully', { variant: 'success' });
    setDeleteModalOpen(false);
  };

  const ticketsActionDropdown = ticketsActionDropdownFunction?.(
    setDeleteModalOpen,
    markTicketAsClose,
    markTicketAsSpam,
  );

  return {
    theme,
    router,
    ticketList,
    selectedTicketList,
    setSelectedTicketList,
    handleChange,
    ticketsListsColumn,
    isDrawerOpen,
    setIsDrawerOpen,
    openDrawer,
    TABLE_CONSTANTS,
    drawerComponent,
    ticketsActionDropdown,
    deleteModalOpen,
    setDeleteModalOpen,
    deleteTicket,
    data,
    columnsName,
    setColumnsName,
    search,
    setSearch,
  };
};
