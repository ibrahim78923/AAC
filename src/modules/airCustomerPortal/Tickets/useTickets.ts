import { useRouter } from 'next/router';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { useEffect, useState } from 'react';
import { useLazyGetCustomerPortalTicketsQuery } from '@/services/airCustomerPortal/Tickets';
import { PAGINATION } from '@/config';

export const useTickets = () => {
  const router = useRouter();
  const [openReportAnIssueModal, setOpenReportAnIssueModal] =
    useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const getTicketsParam = new URLSearchParams();
  getTicketsParam?.append('page', page + '');
  getTicketsParam?.append('limit', pageLimit + '');
  getTicketsParam?.append('metaData', true + '');

  const handleTickets = () => {
    router?.push({
      pathname: AIR_CUSTOMER_PORTAL?.TICKETS,
    });
  };
  const [
    lazyGetTicketsTrigger,
    { data, isLoading, isFetching, isError, isSuccess },
  ] = useLazyGetCustomerPortalTicketsQuery();
  useEffect(() => {
    const handleGetTicket = async () => {
      await lazyGetTicketsTrigger(getTicketsParam);
    };
    handleGetTicket();
  }, [page, pageLimit]);
  const ticketData = data?.data?.tickets;
  const metaData = data?.data?.meta;
  const handleSingleTickets = (id: any) => {
    router?.push({
      pathname: AIR_CUSTOMER_PORTAL?.SINGLE_TICKETS,
      query: { id },
    });
  };

  const handleButtonClick = (event: any) => {
    setAnchorEl(event?.currentTarget);
    setOpen(!open);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
    setOpenReportAnIssueModal(true);
  };
  return {
    handleTickets,
    handleSingleTickets,
    handleButtonClick,
    handleClose,
    anchorEl,
    open,
    openReportAnIssueModal,
    setOpenReportAnIssueModal,
    pageLimit,
    setPageLimit,
    page,
    setPage,
    ticketData,
    metaData,
    isLoading,
    isError,
    isFetching,
    isSuccess,
  };
};
