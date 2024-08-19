import TanstackTable from '@/components/Table/TanstackTable';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { Permissions } from '@/constants/permissions';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { Typography } from '@mui/material';
import { ARRAY_INDEX, SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { PAGINATION } from '@/config';
import { useRelatedTickets } from './useRelatedTickets';
import { renderPortalComponent } from './RelatedTickets.data';

export const RelatedTickets = () => {
  const {
    selectedChildTickets,
    relatedTicketsColumns,
    setPage,
    data,
    setPageLimit,
    setSelectedChildTickets,
    relatedTicketsActionDropdown,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    setIsPortalOpen,
    isPortalOpen,
    portalComponentProps,
    getChildTicketsListData,
    page,
  } = useRelatedTickets();

  if (isLoading || isFetching) return <SkeletonTable />;

  return (
    <>
      <PageTitledHeader
        title={
          <>
            {' '}
            <Typography variant="h5" color="slateBlue.main">
              {`Child Tickets (${
                data?.data?.tickets?.length > SELECTED_ARRAY_LENGTH?.ONE
                  ? data?.data?.meta?.total
                  : !!data?.data?.tickets?.[ARRAY_INDEX?.ZERO]
                        ?.childTicketDetails?._id
                    ? data?.data?.meta?.total
                    : SELECTED_ARRAY_LENGTH?.ZERO
              })`}
            </Typography>
          </>
        }
        addTitle="Add Child Ticket"
        createPermissionKey={[
          AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_CHILD_TICKET,
        ]}
        handleAction={() => {
          setSelectedChildTickets?.([]);
          setIsPortalOpen?.({
            isOpen: true,
            isUpsert: true,
          });
        }}
      >
        <PermissionsGuard
          permissions={
            Permissions?.AIR_SERVICES_TICKETS_TICKETS_DETAILS_CHILD_TICKET_ACTION
          }
        >
          <SingleDropdownButton
            disabled={!!!selectedChildTickets?.length}
            dropdownOptions={relatedTicketsActionDropdown}
          />
        </PermissionsGuard>
      </PageTitledHeader>
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_TICKETS_TICKETS_DETAILS?.CHILD_TICKET_LIST_VIEW,
        ]}
      >
        <TanstackTable
          isLoading={isLoading}
          data={
            data?.data?.tickets?.length > SELECTED_ARRAY_LENGTH?.ONE
              ? data?.data?.tickets
              : !!data?.data?.tickets?.[ARRAY_INDEX?.ZERO]?.childTicketDetails
                    ?._id
                ? data?.data?.tickets
                : []
          }
          activeCheck={selectedChildTickets}
          columns={relatedTicketsColumns}
          isFetching={isFetching}
          isError={isError}
          isSuccess={isSuccess || true}
          pageLimit={data?.data?.meta?.limit}
          currentPage={
            data?.data?.tickets?.length > SELECTED_ARRAY_LENGTH?.ONE
              ? data?.data?.meta?.page
              : !!data?.data?.tickets?.[ARRAY_INDEX?.ZERO]?.childTicketDetails
                    ?._id
                ? data?.data?.meta?.page
                : SELECTED_ARRAY_LENGTH?.ZERO
          }
          count={
            data?.data?.tickets?.length > SELECTED_ARRAY_LENGTH?.ONE
              ? data?.data?.meta?.pages
              : !!data?.data?.tickets?.[ARRAY_INDEX?.ZERO]?.childTicketDetails
                    ?._id
                ? data?.data?.meta?.pages
                : SELECTED_ARRAY_LENGTH?.ZERO
          }
          totalRecords={
            data?.data?.tickets?.length > SELECTED_ARRAY_LENGTH?.ONE
              ? data?.data?.meta?.total
              : !!data?.data?.tickets?.[ARRAY_INDEX?.ZERO]?.childTicketDetails
                    ?._id
                ? data?.data?.meta?.total
                : PAGINATION?.TOTAL_RECORDS
          }
          onPageChange={(page: number) => setPage(page)}
          setPage={setPage}
          setPageLimit={setPageLimit}
          isPagination
          errorProps={{
            canRefresh: true,
            refresh: () => getChildTicketsListData?.(page),
          }}
        />
      </PermissionsGuard>
      {isPortalOpen?.isOpen &&
        renderPortalComponent?.(isPortalOpen, portalComponentProps)}
    </>
  );
};
