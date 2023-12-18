import CustomPagination from '@/components/CustomPagination';
import { Header } from './Header';
import { TicketsCard } from './TicketCard';
import {
  ticketsDataArray,
  newTicketsDropdownFunction,
  allTicketsDropdownFunction,
} from './Tickets.data';
import { Grid } from '@mui/material';
import { useTickets } from './useTickets';

export const Tickets = () => {
  const {
    handleButtonClick,
    handleClose,
    anchorEl,
    open,
    openReportAnIssueModal,
    setOpenReportAnIssueModal,
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
        {ticketsDataArray?.map((option: any) => (
          <TicketsCard
            key={option?.id}
            id={option?.id}
            icon={option?.icon}
            heading={option?.heading}
            subHeading={option?.subHeading}
            created={option?.created}
            status={option?.status}
          />
        ))}
      </Grid>
      <CustomPagination />
    </>
  );
};
