import TanstackTable from '@/components/Table/TanstackTable';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { useTasks } from './useTasks';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';

export const Tasks = () => {
  const {
    ticketsTasksListsColumns,
    lazyGetTicketsTasksStatus,
    setPage,
    setPageLimit,
    isPortalOpen,
    setIsPortalOpen,
    selectedTasksList,
    renderPortalComponent,
    actionsForTicketTasksLists,
    getTaskListData,
    page,
  } = useTasks();
  return (
    <>
      <PageTitledHeader
        title={'Task'}
        addTitle="Add New Task"
        createPermissionKey={[AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_TASK]}
        handleAction={() =>
          setIsPortalOpen({
            isOpen: true,
            isUpsert: true,
            type: GENERIC_UPSERT_FORM_CONSTANT?.ADD,
          })
        }
        hasExport
        exportPermissionKey={[
          AIR_SERVICES_TICKETS_TICKETS_DETAILS?.EXPORT_TASK,
        ]}
      >
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_TICKETS_TICKETS_DETAILS?.EDIT_TASK,
            AIR_SERVICES_TICKETS_TICKETS_DETAILS?.DELETE_TASK,
          ]}
        >
          <SingleDropdownButton
            dropdownOptions={actionsForTicketTasksLists}
            disabled={!!!selectedTasksList?.length}
          />
        </PermissionsGuard>
      </PageTitledHeader>
      <br />
      <PermissionsGuard
        permissions={[AIR_SERVICES_TICKETS_TICKETS_DETAILS?.TASK_LIST_VIEW]}
      >
        <TanstackTable
          columns={ticketsTasksListsColumns}
          data={lazyGetTicketsTasksStatus?.data?.data?.tasks}
          isLoading={lazyGetTicketsTasksStatus?.isLoading}
          currentPage={lazyGetTicketsTasksStatus?.data?.data?.meta?.page}
          count={lazyGetTicketsTasksStatus?.data?.data?.meta?.pages}
          pageLimit={lazyGetTicketsTasksStatus?.data?.data?.meta?.limit}
          totalRecords={lazyGetTicketsTasksStatus?.data?.data?.meta?.total}
          setPage={setPage}
          setPageLimit={setPageLimit}
          isFetching={lazyGetTicketsTasksStatus?.isFetching}
          isError={lazyGetTicketsTasksStatus?.isError}
          isSuccess={lazyGetTicketsTasksStatus?.isSuccess}
          onPageChange={(page: number) => setPage(page)}
          isPagination
          errorProps={{
            canRefresh: true,
            refresh: () => getTaskListData?.(page),
          }}
        />
      </PermissionsGuard>
      {isPortalOpen?.isOpen && renderPortalComponent?.()}
    </>
  );
};
