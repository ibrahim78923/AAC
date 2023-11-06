import { useTicketsLists } from './useTicketsLists';
import { TicketsTableView } from './TicketsTableView';
import { TableBoardView } from './TicketsBoardView';
import { AlertModals } from '@/components/AlertModals';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { TicketsListSubHeader } from './TicketsListSubHeader';

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
    deleteTicket,
    ticketsListsColumn,
  } = useTicketsLists();
  return (
    <>
      <PageTitledHeader
        title={'Ticket List - All Tickets'}
        addTitle={'Create Ticket'}
        hasExport
        handleAction={() => openDrawer?.(TABLE_CONSTANTS?.CREATE_NEW_TICKET)}
      />
      <br />
      <TicketsListSubHeader
        onFilterClick={() => openDrawer?.(TABLE_CONSTANTS?.FILTER_DATA)}
        ticketsActionDropdown={ticketsActionDropdown}
        onCustomizeClick={() => openDrawer?.(TABLE_CONSTANTS?.CUSTOMIZE_COLUMN)}
      />
      <br />
      {router?.query?.viewType === 'board' ? (
        <TableBoardView />
      ) : (
        <TicketsTableView ticketsListsColumn={ticketsListsColumn} />
      )}
      {deleteModalOpen && (
        <AlertModals
          type="delete"
          message="Are you sure you want to delete the selected ticket"
          open={deleteModalOpen}
          handleClose={() => setDeleteModalOpen(false)}
          handleSubmitBtn={() => deleteTicket?.()}
        />
      )}
      {isDrawerOpen && drawerComponent?.[router?.query?.tableAction as string]}
    </>
  );
};
