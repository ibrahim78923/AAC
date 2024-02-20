import { useTicketsLists } from './useTicketsLists';
import { TicketsTableView } from './TicketsTableView';
import { TableBoardView } from './TicketsBoardView';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { TicketsListSubHeader } from './TicketsListSubHeader';
import { EXPORT_TYPE, VIEW_TYPES } from '@/constants/strings';
import { TICKETS_ACTION_CONSTANTS } from './TicketsLists.data';

export const TicketsLists = () => {
  const {
    hasTicketAction,
    router,
    setTicketAction,
    ticketActionComponent,
    ticketsActionDropdown,
    lazyGetTicketsStatus,
    ticketsListsColumnPersist,
    search,
    setSearch,
    setPage,
    getTicketsListDataExport,
    ticketsListsActiveColumn,
    selectedTicketList,
    setPageLimit,
    setTicketsListsActiveColumn,
    setSelectedTicketList,
    filterTicketLists,
  } = useTicketsLists();

  return (
    <>
      <PageTitledHeader
        title={
          router?.query?.viewType === VIEW_TYPES?.BOARD
            ? 'Tickets Board'
            : 'Ticket List - All Tickets'
        }
        addTitle={'Create Ticket'}
        hasExport
        handleExcelExport={() => getTicketsListDataExport?.(EXPORT_TYPE?.XLS)}
        handleCsvExport={() => getTicketsListDataExport?.(EXPORT_TYPE?.CSV)}
        handleAction={() =>
          setTicketAction?.(TICKETS_ACTION_CONSTANTS?.CREATE_NEW_TICKET)
        }
      />
      <br />
      <TicketsListSubHeader
        disabledActionButton={!!!selectedTicketList?.length}
        setSearch={setSearch}
        onFilterClick={() =>
          setTicketAction?.(TICKETS_ACTION_CONSTANTS?.FILTER_DATA)
        }
        ticketsActionDropdown={ticketsActionDropdown}
        onCustomizeClick={() =>
          setTicketAction?.(TICKETS_ACTION_CONSTANTS?.CUSTOMIZE_COLUMN)
        }
        setTicketsListsActiveColumn={setTicketsListsActiveColumn}
      />
      <br />
      {router?.query?.viewType === VIEW_TYPES?.BOARD ? (
        <TableBoardView
          setTicketAction={setTicketAction}
          setSelectedTicketList={setSelectedTicketList}
          search={search}
          filterTicketLists={filterTicketLists}
        />
      ) : (
        <TicketsTableView
          ticketsListsColumn={
            ticketsListsColumnPersist?.filter(
              (col: any) => ticketsListsActiveColumn?.includes?.(col?.id),
            ) ?? []
          }
          ticketListsData={lazyGetTicketsStatus?.data?.data?.tickets}
          metaData={lazyGetTicketsStatus}
          setPage={setPage}
          setPageLimit={setPageLimit}
        />
      )}
      {hasTicketAction &&
        ticketActionComponent?.[router?.query?.ticketAction as string]}
    </>
  );
};
