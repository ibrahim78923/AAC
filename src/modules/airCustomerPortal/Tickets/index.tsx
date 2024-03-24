import CustomPagination from '@/components/CustomPagination';
import { Header } from './Header';
import { TicketsCard } from './TicketCard';
import { newTicketsDropdownFunction } from './Tickets.data';
import ApiErrorState from '@/components/ApiErrorState';
import NoData from '@/components/NoData';
import { useTickets } from './useTickets';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { Fragment } from 'react';

export const Tickets = () => {
  const {
    handleButtonClick,
    handleClose,
    anchorEl,
    open,
    openReportAnIssueModal,
    setOpenReportAnIssueModal,
    setPageLimit,
    setPage,
    ticketData,
    metaData,
    isLoading,
    isError,
    isFetching,
    allTicketsDropdown,
    ticketStatus,
  } = useTickets();

  return (
    <>
      <Header
        newTicketsDropdownFunction={newTicketsDropdownFunction}
        allTicketsDropdownFunction={allTicketsDropdown}
        setOpenReportAnIssueModal={setOpenReportAnIssueModal}
        openReportAnIssueModal={openReportAnIssueModal}
        handleButtonClick={handleButtonClick}
        handleClose={handleClose}
        anchorEl={anchorEl}
        open={open}
        ticketStatus={ticketStatus}
      />
      {isLoading || isFetching ? (
        <SkeletonForm />
      ) : isError ? (
        <ApiErrorState />
      ) : !!!ticketData?.length ? (
        <NoData message="No ticket found" />
      ) : (
        ticketData?.map((option: any) => (
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
        onPageChange={(page: any) => setPage(page)}
        setPage={setPage}
        setPageLimit={setPageLimit}
      />
    </>
  );
};
