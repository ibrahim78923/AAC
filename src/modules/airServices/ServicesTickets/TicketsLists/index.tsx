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
    TABLE_CONSTANTS,
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
  } = useTicketsLists();

  return (
    <>
      <PageTitledHeader
        title={'Ticket List - All Tickets'}
        addTitle={'Create Ticket'}
        hasExport
        handleExcelExport={() => getTicketsListDataExport?.('excel')}
        handleCsvExport={() => getTicketsListDataExport?.('csv')}
        handleAction={() => openDrawer?.(TABLE_CONSTANTS?.CREATE_NEW_TICKET)}
      />
      <br />
      <TicketsListSubHeader
        search={search}
        setSearch={setSearch}
        onFilterClick={() => openDrawer?.(TABLE_CONSTANTS?.FILTER_DATA)}
        ticketsActionDropdown={ticketsActionDropdown}
        onCustomizeClick={() => openDrawer?.(TABLE_CONSTANTS?.CUSTOMIZE_COLUMN)}
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
          setPage={setPage}
        />
      )}
      <TicketsDelete
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        selectedTicketList={selectedTicketList}
      />
      {isDrawerOpen && drawerComponent?.[router?.query?.tableAction as string]}
    </>
  );
};
