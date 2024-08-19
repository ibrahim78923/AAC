import { SingleDropdownButtonCloseMenuI } from '@/components/SingleDropdownButton/SingleDropdownButton.interface';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import {
  AIR_CUSTOMER_PORTAL_DASHBOARD_PERMISSIONS,
  AIR_CUSTOMER_PORTAL_TICKETS_PERMISSIONS,
} from '@/constants/permission-keys';
import { TICKET_STATUS } from '@/constants/strings';
import { NextRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';

export const ticketStatuses: string[] = [
  TICKET_STATUS?.CLOSED,
  TICKET_STATUS?.OPEN,
  TICKET_STATUS?.PENDING,
  TICKET_STATUS?.RESOLVED,
  TICKET_STATUS?.SPAM,
];

export const CHECK_SURVEY_SUBMISSION_STATUS = {
  SUBMITTED: 'Survey submitted.',
  NOT_SUBMITTED: 'Survey not submitted.',
};

export const allTicketsDropdownFunction = (
  setTicketStatus: Dispatch<SetStateAction<string>>,
) => [
  {
    id: 1,
    permissionKey: [AIR_CUSTOMER_PORTAL_TICKETS_PERMISSIONS?.FILTERS],
    title: 'All tickets',
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setTicketStatus?.('All tickets');
      closeMenu?.();
    },
  },
  {
    id: 2,
    permissionKey: [AIR_CUSTOMER_PORTAL_TICKETS_PERMISSIONS?.FILTERS],
    title: 'Open',
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setTicketStatus?.(TICKET_STATUS?.OPEN);
      closeMenu?.();
    },
  },
  {
    id: 3,
    permissionKey: [AIR_CUSTOMER_PORTAL_TICKETS_PERMISSIONS?.FILTERS],
    title: 'Closed',
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setTicketStatus?.(TICKET_STATUS?.CLOSED);
      closeMenu?.();
    },
  },
  {
    id: 4,
    permissionKey: [AIR_CUSTOMER_PORTAL_TICKETS_PERMISSIONS?.FILTERS],
    title: 'Resolved',
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setTicketStatus?.(TICKET_STATUS?.RESOLVED);
      closeMenu?.();
    },
  },
];

export const newTicketsDropdownDynamic = (
  setOpenReportAnIssueModal: Dispatch<SetStateAction<boolean>>,
  router: NextRouter,
) => [
  {
    id: 1,
    title: 'Report an issue',
    permissionKey: [
      AIR_CUSTOMER_PORTAL_DASHBOARD_PERMISSIONS?.REPORT_AN_ISSUES,
    ],
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      setOpenReportAnIssueModal?.(true);
      closeMenu?.();
    },
  },
  {
    id: 2,
    title: 'Request a service',
    permissionKey: [
      AIR_CUSTOMER_PORTAL_DASHBOARD_PERMISSIONS?.SENT_SERVICES_REQUEST,
    ],
    handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => {
      router?.push({
        pathname: AIR_CUSTOMER_PORTAL?.CATALOG_SERVICES,
      });
      closeMenu?.();
    },
  },
];
