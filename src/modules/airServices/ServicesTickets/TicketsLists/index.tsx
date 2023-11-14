import { useTicketsLists } from './useTicketsLists';
import { TicketsTableView } from './TicketsTableView';
import { TableBoardView } from './TicketsBoardView';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { TicketsListSubHeader } from './TicketsListSubHeader';
import { TicketsDelete } from './TicketsDelete';

export const TicketsLists = () => {
  const {
    isDrawerOpen,
    router,
    openDrawer,
    TICKETS_ACTION_CONSTANTS,
    drawerComponent,
    ticketsActionDropdown,
    deleteModalOpen,
    setDeleteModalOpen,
    lazyGetTicketsStatus,
    ticketsListsColumnPersist,
    search,
    setSearch,
    setPage,
    getTicketsListDataExport,
    columnNames,
    selectedTicketList,
    setPageLimit,
  } = useTicketsLists();

  return (
    <>
      <PageTitledHeader
        title={'Ticket List - All Tickets'}
        addTitle={'Create Ticket'}
        hasExport
        handleExcelExport={() => getTicketsListDataExport?.('XLS')}
        handleCsvExport={() => getTicketsListDataExport?.('CSV')}
        handleAction={() =>
          openDrawer?.(TICKETS_ACTION_CONSTANTS?.CREATE_NEW_TICKET)
        }
      />
      <br />
      <TicketsListSubHeader
        disabledActionButton={!!!selectedTicketList?.length}
        search={search}
        setSearch={setSearch}
        onFilterClick={() =>
          openDrawer?.(TICKETS_ACTION_CONSTANTS?.FILTER_DATA)
        }
        ticketsActionDropdown={ticketsActionDropdown}
        onCustomizeClick={() =>
          openDrawer?.(TICKETS_ACTION_CONSTANTS?.CUSTOMIZE_COLUMN)
        }
      />
      <br />
      {router?.query?.viewType === 'board' ? (
        <TableBoardView />
      ) : (
        <TicketsTableView
          ticketsListsColumn={
            ticketsListsColumnPersist?.filter(
              (col: any) => columnNames?.includes?.(col?.id),
            ) ?? []
          }
          ticketListsData={lazyGetTicketsStatus?.data?.data?.tickets ?? []}
          isLoading={lazyGetTicketsStatus?.isLoading}
          page={lazyGetTicketsStatus?.data?.data?.meta?.page}
          totalPages={lazyGetTicketsStatus?.data?.data?.meta?.pages}
          pageLimit={lazyGetTicketsStatus?.data?.data?.meta?.limit}
          totalRecords={lazyGetTicketsStatus?.data?.data?.meta?.total}
          setPage={setPage}
          setPageLimit={setPageLimit}
          isFetching={lazyGetTicketsStatus?.isFetching}
          isError={lazyGetTicketsStatus?.isError}
          isSuccess={lazyGetTicketsStatus?.isSuccess}
        />
      )}
      <TicketsDelete
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        selectedTicketList={selectedTicketList}
      />
      {isDrawerOpen && drawerComponent?.[router?.query?.ticketAction as string]}
    </>
  );
};
