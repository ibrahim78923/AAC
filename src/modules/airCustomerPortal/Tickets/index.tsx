import CustomPagination from '@/components/CustomPagination';
import { TicketsCard } from './TicketCard';
import ApiErrorState from '@/components/ApiErrorState';
import NoData from '@/components/NoData';
import { useTickets } from './useTickets';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { Fragment } from 'react';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import {
  AIR_CUSTOMER_PORTAL_DASHBOARD_PERMISSIONS,
  AIR_CUSTOMER_PORTAL_TICKETS_PERMISSIONS,
} from '@/constants/permission-keys';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import AddBoxIcon from '@mui/icons-material/AddBox';

import { TicketCardDataI } from './TicketCard/TicketCard.interface';
import { ReportIssue } from './ReportIssue';

export const Tickets = () => {
  const {
    openReportAnIssueModal,
    setOpenReportAnIssueModal,
    setPageLimit,
    setPage,
    ticketData,
    metaData,
    lazyGetCustomerPortalTicketsStatus,
    allTicketsDropdown,
    ticketStatus,
    newTicketsDropdown,
    getTicketsData,
    page,
  } = useTickets();

  return (
    <>
      <PageTitledHeader title={'All Tickets'}>
        <PermissionsGuard
          permissions={[AIR_CUSTOMER_PORTAL_TICKETS_PERMISSIONS?.FILTERS]}
        >
          <SingleDropdownButton
            dropdownOptions={allTicketsDropdown}
            dropdownName={ticketStatus}
          />
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[
            AIR_CUSTOMER_PORTAL_DASHBOARD_PERMISSIONS?.REPORT_AN_ISSUES,
            AIR_CUSTOMER_PORTAL_DASHBOARD_PERMISSIONS?.SENT_SERVICES_REQUEST,
          ]}
        >
          <SingleDropdownButton
            dropdownOptions={newTicketsDropdown}
            dropdownName={'New'}
            btnVariant="contained"
            color="primary"
            startIcon={<AddBoxIcon />}
          />
        </PermissionsGuard>
      </PageTitledHeader>
      {lazyGetCustomerPortalTicketsStatus?.isLoading ||
      lazyGetCustomerPortalTicketsStatus?.isFetching ? (
        <SkeletonForm />
      ) : lazyGetCustomerPortalTicketsStatus?.isError ? (
        <ApiErrorState canRefresh refresh={() => getTicketsData?.(page)} />
      ) : !!!ticketData?.length ? (
        <NoData message="No ticket found" />
      ) : (
        ticketData?.map((option: TicketCardDataI) => (
          <Fragment key={option?._id}>
            <TicketsCard ticket={option} />
          </Fragment>
        ))
      )}
      <CustomPagination
        currentPage={metaData?.page}
        count={metaData?.pages}
        pageLimit={metaData?.limit}
        totalRecords={metaData?.total}
        onPageChange={(page: number) => setPage(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
      />
      {openReportAnIssueModal && (
        <ReportIssue
          isPortalOpen={openReportAnIssueModal}
          setIsPortalOpen={setOpenReportAnIssueModal}
        />
      )}
    </>
  );
};
