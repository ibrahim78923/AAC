import { useTicketsLists } from './useTicketsLists';
import CommonDrawer from '@/components/CommonDrawer';
import { TicketsTableView } from './TicketsTableView';
import { TableBoardView } from './TicketsBoardView';
import { AlertModals } from '@/components/AlertModals';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { TicketsListSubHeader } from './TicketsListComponents/TicketsListSubHeader';
import { TicketsColumnDrag } from './TicketsListComponents/TicketsColumnDrag';

export const TicketsLists = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    router,
    openDrawer,
    TABLE_CONSTANTS,
    drawerComponent,
    ticketsActionDropdown,
    deleteModalOpen,
    setDeleteModalOpen,
  } = useTicketsLists();
  return (
    <>
      <PageTitledHeader
        title={'Ticket List - All Tickets'}
        addTitle={'Create Ticket'}
        hasExport
        handleAction={() => openDrawer?.(TABLE_CONSTANTS.CREATE_NEW_TICKET)}
      />
      <br />
      <TicketsListSubHeader
        onFilterClick={() => openDrawer?.(TABLE_CONSTANTS.FILTER_DATA)}
        // onActionClick={() => openDrawer?.(TABLE_CONSTANTS.BULK_UPDATE_DATA)}
        ticketsActionDropdown={ticketsActionDropdown}
        onCustomizeClick={() => openDrawer?.(TABLE_CONSTANTS.CUSTOMIZE_COLUMN)}
      />
      <br />
      {router?.query?.viewType === 'board' ? (
        <TableBoardView />
      ) : (
        <TicketsTableView />
      )}
      <TicketsColumnDrag />
      {isDrawerOpen && (
        <CommonDrawer
          isDrawerOpen={isDrawerOpen}
          onClose={
            drawerComponent?.[router?.query?.tableAction as string]
              ?.resetHandler ||
            (() => {
              router?.push({ pathname: router?.pathname });
              setIsDrawerOpen?.(false);
            })
          }
          okText={
            drawerComponent?.[router?.query?.tableAction as string]?.okText
          }
          title={drawerComponent?.[router?.query?.tableAction as string]?.title}
          submitHandler={
            drawerComponent?.[router?.query?.tableAction as string]
              ?.submitHandler
          }
          isOk={drawerComponent?.[router?.query?.tableAction as string]?.isOk}
          cancelText={
            drawerComponent?.[router?.query?.tableAction as string]?.cancelText
          }
          footer
        >
          {isDrawerOpen ? (
            drawerComponent?.[router?.query?.tableAction as string]?.children
          ) : (
            <>Loading</>
          )}
        </CommonDrawer>
      )}
      {deleteModalOpen && (
        <AlertModals
          type="delete"
          open={deleteModalOpen}
          handleClose={() => setDeleteModalOpen(false)}
          handleSubmit={() => {}}
          message=""
        />
      )}
    </>
  );
};
