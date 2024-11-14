import { RootState } from '@/redux/store';

export const departmentWiseAgentSelector = (state: RootState) =>
  state?.servicesDashboard?.departmentWiseAgent;

export const dashboardPageSelector = (state: RootState) =>
  state?.servicesDashboard?.page;

export const dashboardPageLimitSelector = (state: RootState) =>
  state?.servicesDashboard?.pageLimit;

export const dashboardSearchSelector = (state: RootState) =>
  state?.servicesDashboard?.search;

export const dashboardFilterSelector = (state: RootState) =>
  state?.servicesDashboard?.filterDashboardLists;

export const dashboardIsPortalOpenSelector = (state: RootState) =>
  state?.servicesDashboard?.isPortalOpen;

export const dashboardTotalRecordsSelector = (state: RootState) =>
  state?.servicesDashboard?.totalRecords;

export const dashboardTicketBasedGraphTypeSelector = (state: RootState) =>
  state?.servicesDashboard?.ticketBasedGraphType;
