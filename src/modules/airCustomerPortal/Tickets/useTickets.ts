import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useLazyGetCustomerPortalTicketsQuery } from '@/services/airCustomerPortal/Tickets';
import { PAGINATION } from '@/config';
import { allTicketsDropdownFunction, ticketStatuses } from './Tickets.data';
import { newTicketsDropdownDynamic } from './ReportIssue/ReportIssue.data';
import { getCustomerPortalStyling } from '@/utils';

export const useTickets = () => {
  const router = useRouter();
  const [openReportAnIssueModal, setOpenReportAnIssueModal] =
    useState<boolean>(false);
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState<number>(PAGINATION?.PAGE_LIMIT);
  const [ticketStatus, setTicketStatus] = useState<string>('All tickets');

  const [
    lazyGetCustomerPortalTicketsTrigger,
    lazyGetCustomerPortalTicketsStatus,
  ] = useLazyGetCustomerPortalTicketsQuery();

  const getTicketsData = async (currentPage: number = page) => {
    const getTicketsParam: URLSearchParams = new URLSearchParams();
    getTicketsParam?.append('page', currentPage + '');
    getTicketsParam?.append('limit', pageLimit + '');
    getTicketsParam?.append('metaData', true + '');
    getTicketsParam?.append('customerPortal', true + '');
    ticketStatuses?.includes(ticketStatus) &&
      getTicketsParam?.append(
        'status',
        ticketStatuses?.includes(ticketStatus) ? ticketStatus : '',
      );

    try {
      await lazyGetCustomerPortalTicketsTrigger(getTicketsParam)?.unwrap();
    } catch (error) {}
  };

  useEffect(() => {
    getTicketsData?.();
  }, [page, pageLimit, ticketStatus]);

  const ticketData = lazyGetCustomerPortalTicketsStatus?.data?.data?.tickets;
  const metaData = lazyGetCustomerPortalTicketsStatus?.data?.data?.meta;

  const allTicketsDropdown = allTicketsDropdownFunction?.(setTicketStatus);
  const newTicketsDropdown = newTicketsDropdownDynamic?.(
    setOpenReportAnIssueModal,
    router,
  );
  const portalStyles = getCustomerPortalStyling();
  return {
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
  };
};
