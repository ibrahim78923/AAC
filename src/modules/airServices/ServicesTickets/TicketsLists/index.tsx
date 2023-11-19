import { useTicketsLists } from './useTicketsLists';
import { TicketsTableView } from './TicketsTableView';
import { TableBoardView } from './TicketsBoardView';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { TicketsListSubHeader } from './TicketsListSubHeader';
import { EXPORT_TYPE } from '@/constants/strings';
import {
  TICKETS_ACTION_CONSTANTS,
  ticketsListsData,
} from './TicketsLists.data';

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
  } = useTicketsLists();

  return (
    <>
      <PageTitledHeader
        title={'Ticket List - All Tickets'}
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
        search={search}
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
      {router?.query?.viewType === 'board' ? (
        <TableBoardView />
      ) : (
        <TicketsTableView
          ticketsListsColumn={
            ticketsListsColumnPersist?.filter(
              (col: any) => ticketsListsActiveColumn?.includes?.(col?.id),
            ) ?? []
          }
          ticketListsData={
            lazyGetTicketsStatus?.data?.data?.tickets ?? ticketsListsData
          }
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
