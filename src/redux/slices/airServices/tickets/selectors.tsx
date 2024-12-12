import { RootState } from '@/redux/store';

export const servicesTicketsIsPortalOpenSelector = (state: RootState) =>
  state?.servicesTickets?.isPortalOpen;

export const servicesTicketsTotalRecordsSelector = (state: RootState) =>
  state?.servicesTickets?.totalRecords;

export const servicesTicketsSelectedTicketListsSelector = (state: RootState) =>
  state?.servicesTickets?.selectedTicketLists;

export const servicesTicketsListsActiveColumnSelector = (state: RootState) =>
  state?.servicesTickets?.ticketsListsActiveColumn;

export const servicesTicketsFilterTicketListsSelector = (state: RootState) =>
  state?.servicesTickets?.filterTicketLists;

export const servicesTicketsPageSelector = (state: RootState) =>
  state?.servicesTickets?.page;

export const servicesTicketsPageLimitSelector = (state: RootState) =>
  state?.servicesTickets?.pageLimit;

export const servicesTicketsSearchSelector = (state: RootState) =>
  state?.servicesTickets?.search;
