import { useTicketsLists } from './useTicketsLists';
import { TicketsListHeader } from './components/TicketsListHeader';
import { TicketsListSubHeader } from './components/TicketsListSubHeader';
import { TicketsColumnDrag } from './components/TicketsColumnDrag';
import CommonDrawer from '@/components/CommonDrawer';
import { TicketsTableView } from './TicketsTableView';
import { TableBoardView } from './TicketsBoardView';

export const TicketsLists = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    router,
    openDrawer,
    TABLE_CONSTANTS,
    drawerComponent,
  } = useTicketsLists();
  return (
    <>
      <TicketsListHeader
        setOpenCreateTicket={() =>
          openDrawer?.(TABLE_CONSTANTS.CREATE_NEW_TICKET)
        }
      />
      <br />
      <TicketsListSubHeader
        onFilterClick={() => openDrawer?.(TABLE_CONSTANTS.FILTER_DATA)}
        onActionClick={() => openDrawer?.(TABLE_CONSTANTS.BULK_UPDATE_DATA)}
        onCustomizeClick={() => openDrawer?.(TABLE_CONSTANTS.CUSTOMIZE_COLUMN)}
      />
      <br />
      {router?.query?.viewType === 'board' ? (
        <>
          Board View <TableBoardView />
        </>
      ) : (
        <>
          Table View <TicketsTableView />
        </>
      )}
      <TicketsColumnDrag />
      {isDrawerOpen && (
        <CommonDrawer
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          okText={
            drawerComponent?.[router?.query?.tableAction as string]?.okText
          }
          title={drawerComponent?.[router?.query?.tableAction as string]?.title}
          submitHandler={
            drawerComponent?.[router?.query?.tableAction as string]
              ?.submitHandler
          }
          isOk={drawerComponent?.[router?.query?.tableAction as string]?.isOk}
        >
          {isDrawerOpen ? (
            drawerComponent?.[router?.query?.tableAction as string]?.children
          ) : (
            <>Loading</>
          )}
        </CommonDrawer>
      )}
    </>
  );
};
