import CustomPagination from '@/components/CustomPagination';
import { TicketsCard } from './TicketCard';
import { useTickets } from './useTickets';
import { Fragment } from 'react';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { TicketCardDataI } from './TicketCard/TicketCard.interface';
import { ReportIssue } from './ReportIssue';
import { PublicSingleDropdownButton } from '@/components/Buttons/PublicSingleDropdownButton';
import { customizePortalDefaultValues } from '@/layout/CustomerPortal/CustomerPortal.data';
import { Theme } from '@mui/material';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';

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
    portalStyles,
  } = useTickets();

  return (
    <>
      <PageTitledHeader title={'All Tickets'}>
        <PublicSingleDropdownButton
          dropdownOptions={allTicketsDropdown}
          dropdownName={ticketStatus?.split('_')?.join(' ')?.toLowerCase()}
          sx={(theme: Theme) => ({
            borderColor:
              portalStyles?.btnSecondary ||
              customizePortalDefaultValues(theme)?.btnSecondary,
            color:
              portalStyles?.btnSecondary ||
              customizePortalDefaultValues(theme)?.btnSecondary,
            '&:hover': {
              borderColor:
                portalStyles?.btnSecondary ||
                customizePortalDefaultValues(theme)?.btnSecondary,
              color:
                portalStyles?.btnSecondary ||
                customizePortalDefaultValues(theme)?.btnSecondary,
            },
          })}
        />
        <PublicSingleDropdownButton
          dropdownOptions={newTicketsDropdown}
          dropdownName={'New'}
          btnVariant="contained"
          startIcon={<AddBoxIcon />}
          sx={(theme: Theme) => ({
            bgcolor:
              portalStyles?.btnPrimary ||
              customizePortalDefaultValues(theme)?.btnPrimary,
            color: 'common.white',
            '&:hover': {
              bgcolor:
                portalStyles?.btnPrimary ||
                customizePortalDefaultValues(theme)?.btnPrimary,
              color: 'common.white',
            },
          })}
        />
      </PageTitledHeader>
      <ApiRequestFlow
        hasNoData={!ticketData?.length}
        showSkeleton={
          lazyGetCustomerPortalTicketsStatus?.isLoading ||
          lazyGetCustomerPortalTicketsStatus?.isFetching
        }
        hasError={lazyGetCustomerPortalTicketsStatus?.isError}
        refreshApi={() => getTicketsData?.(page)}
        noDataMessage="No ticket found"
        refreshButtonProps={{
          sx: (theme: Theme) => ({
            bgcolor:
              portalStyles?.btnPrimary ||
              customizePortalDefaultValues(theme)?.btnPrimary,
            color: 'common.white',
            '&:hover': {
              bgcolor:
                portalStyles?.btnPrimary ||
                customizePortalDefaultValues(theme)?.btnPrimary,
              color: 'common.white',
            },
          }),
        }}
      >
        {ticketData?.map((option: TicketCardDataI) => (
          <Fragment key={option?._id}>
            <TicketsCard ticket={option} />
          </Fragment>
        ))}
      </ApiRequestFlow>
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
