import CustomPagination from '@/components/CustomPagination';
import { Header } from './Header';
import { TicketsCard } from './TicketCard';
import {
  newTicketsDropdownFunction,
  allTicketsDropdownFunction,
} from './Tickets.data';
import { Grid } from '@mui/material';
import ApiErrorState from '@/components/ApiErrorState';
import NoData from '@/components/NoData';
import { useTickets } from './useTickets';

export const Tickets = () => {
  const {
    handleButtonClick,
    handleClose,
    anchorEl,
    open,
    openReportAnIssueModal,
    setOpenReportAnIssueModal,
    page,
    setPageLimit,
    pageLimit,
    setPage,
    ticketData,
    metaData,
    handleSingleTickets,
    isLoading,
    isError,
    isFetching,
    isSuccess,
  } = useTickets();
  return (
    <>
      <Header
        newTicketsDropdownFunction={newTicketsDropdownFunction}
        allTicketsDropdownFunction={allTicketsDropdownFunction}
        setOpenReportAnIssueModal={setOpenReportAnIssueModal}
        openReportAnIssueModal={openReportAnIssueModal}
        handleButtonClick={handleButtonClick}
        handleClose={handleClose}
        anchorEl={anchorEl}
        open={open}
      />
      <Grid container gap={2} justifyContent={'center'}>
        {isError ? (
          <ApiErrorState />
        ) : isSuccess && !!!ticketData?.length ? (
          <NoData message="No ticket found" />
        ) : (
          ticketData?.map((option: any) => (
            <Grid item xs={12} key={option?._id}>
              <TicketsCard
                id={option?._id}
                icon={option?.icon}
                heading={option?.subject}
                subHeading={option?.subHeading}
                created={option?.createdAt}
                status={option?.status}
                ticketIdNumber={option?.ticketIdNumber}
                source={option?.source}
                associateAssetsDetails={option?.associateAssetsDetails}
                handleSingleTickets={handleSingleTickets}
                isFetching={isFetching}
                isLoading={isLoading}
              />
            </Grid>
          ))
        )}
        {metaData && metaData?.total > 5 && (
          <Grid item xs={12}>
            <CustomPagination
              currentPage={page}
              count={metaData?.pages}
              pageLimit={pageLimit}
              totalRecords={metaData?.total}
              onPageChange={(page: any) => setPage(page)}
              setPage={setPage}
              setPageLimit={setPageLimit}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};
