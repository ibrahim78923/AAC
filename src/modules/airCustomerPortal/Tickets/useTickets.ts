import { useRouter } from 'next/router';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { useEffect, useState } from 'react';
import { useLazyGetCustomerPortalTicketsQuery } from '@/services/airCustomerPortal/Tickets';
import { PAGINATION } from '@/config';
import useAuth from '@/hooks/useAuth';
import { allTicketsDropdownFunction, ticketStatuses } from './Tickets.data';

export const useTickets = () => {
  const router = useRouter();
  const [openReportAnIssueModal, setOpenReportAnIssueModal] =
    useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [ticketStatus, setTicketStatus] = useState('All tickets');
  const { user }: any = useAuth();
  const requesterId = user?._id;

  const [
    lazyGetTicketsTrigger,
    { data, isLoading, isFetching, isError, isSuccess },
  ] = useLazyGetCustomerPortalTicketsQuery();

  const getTicketsData = async (currentPage = page) => {
    const getTicketsParam = new URLSearchParams();
    getTicketsParam?.append('page', currentPage + '');
    getTicketsParam?.append('limit', pageLimit + '');
    getTicketsParam?.append('metaData', true + '');
    getTicketsParam?.append('requester', requesterId + '');
    ticketStatuses?.includes(ticketStatus) &&
      getTicketsParam?.append(
        'status',
        ticketStatuses?.includes(ticketStatus) ? ticketStatus : '',
      );

    try {
      await lazyGetTicketsTrigger(getTicketsParam)?.unwrap();
    } catch (error) {}
  };

  useEffect(() => {
    getTicketsData?.();
  }, [page, pageLimit, ticketStatus]);

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
  };
  const allTicketsDropdown = allTicketsDropdownFunction?.(setTicketStatus);
  return {
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
    allTicketsDropdown,
    ticketStatus,
  };
};
