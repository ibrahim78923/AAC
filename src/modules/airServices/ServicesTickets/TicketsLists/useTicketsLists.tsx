import { useState, useEffect } from 'react';
import {
  TABLE_CONSTANTS,
  ticketsActionDropdownFunction,
  ticketsListsColumnFunction,
  ticketsListsData,
} from './TicketsLists.data';
import { CustomizeTicketsColumn } from '../CustomizeTicketsColumn';
import { useRouter } from 'next/router';
import { TicketsBulkUpdate } from '../TicketsBulkUpdate';
import { useTheme } from '@mui/material';
import { TicketsFilter } from '../TicketsFilter';
import CreateTicket from '../CreateTicket';
import { enqueueSnackbar } from 'notistack';

export const useTicketsLists = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [ticketList, setTicketList] = useState([]);
  const [selectedTicketList, setSelectedTicketList] = useState([]);

  useEffect(() => {
    setTicketList(ticketsListsData);
  }, [ticketsListsData]);

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

  const [ticketsListsColumn, seTTicketsListsColumn] = useState(
    ticketsListsColumnFunction(
      theme,
      router,
      ticketList,
      setTicketList,
      ticketsListsData,
      handleChange,
    ),
  );
  const ticketsListsColumnPersist = ticketsListsColumnFunction(
    theme,
    router,
    ticketList,
    setTicketList,
    ticketsListsData,
    handleChange,
  );

  const customizeColumns: any = ticketsListsColumnPersist.reduce(
    (x: any, y: any) => {
      const { id } = y;
      return { ...x, [id]: true };
    },
    {},
  );
  const [customizeColumn, setCustomizeColumn] = useState(customizeColumns);

  const drawerComponent: any = {
    'customize-column': (
      <CustomizeTicketsColumn
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        tableColumns={ticketsListsColumnPersist?.slice(1)}
        customizeColumn={customizeColumn}
        setCustomizeColumn={setCustomizeColumn}
      />
    ),

    'filter-data': (
      <TicketsFilter
        setIsDrawerOpen={setIsDrawerOpen}
        isDrawerOpen={isDrawerOpen}
      />
    ),
    'bulk-update-data': (
      <TicketsBulkUpdate
        setIsDrawerOpen={setIsDrawerOpen}
        isDrawerOpen={isDrawerOpen}
        // to={to}
        // setTo={setTo}
      />
    ),
    'create-new-ticket': (
      <CreateTicket
        setIsDrawerOpen={setIsDrawerOpen}
        isDrawerOpen={isDrawerOpen}
      />
    ),
  };

  const openDrawer = (tableActionQuery: any) => {
    router.push({
      pathname: router.pathname,
      query: {
        tableAction: tableActionQuery,
      },
    });
    setTimeout(() => {
      setIsDrawerOpen(true);
    }, 100);
  };
  const markAsClose = () => {
    enqueueSnackbar('Ticket marked as close', { variant: 'success' });
  };
  const markAsSpam = () => {
    enqueueSnackbar('Ticket marked as spam', { variant: 'success' });
  };
  const ticketsActionDropdown = ticketsActionDropdownFunction?.(
    openDrawer,
    setDeleteModalOpen,
    setIsDrawerOpen,
    markAsClose,
    markAsSpam,
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
  };
};
