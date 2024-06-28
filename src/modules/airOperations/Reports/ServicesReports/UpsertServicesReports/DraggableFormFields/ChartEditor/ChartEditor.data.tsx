const CHART_METRICS = {
  TOTAL_ASSETS: 'Total Assets',
  HARDWARE: 'Hardware',
  IT_SERVICES: 'IT Services',
  BACKUP_SERVICES: 'Backup Services',
  UTILIZABLE: 'Utilizable',
  OPEN_TICKETS: 'Open Tickets',
  CLOSE_TICKETS: 'Close Tickets',
  OVERDUE_TICKETS: 'Overdue Tickets',
  UNASSIGNED_TICKETS: 'Unassigned Tickets',
  RESOLVED_TICKETS: 'Resolved Tickets',
  PENDING_TICKETS: 'Pending Tickets',
  ALL: 'All',
  LEASE: 'Lease',
  MAINTENANCE: 'Maintenance',
  SOFTWARE_LICENSE: 'Software license',
  WARRANTY: 'Warranty',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  PENDING: 'Pending',
  RECEIVED: 'Received',
  TOTAL_SOFTWARE: 'Total Software',
  RESTRICTED: 'Restricted',
  IGNORED: 'Ignored',
  MANAGED: 'Managed',
  DISABLED: 'Disabled',
  IN_REVIEW: 'InReview',
};
export const inventoryMetrics = (setChartMetricType: any) => [
  {
    title: CHART_METRICS?.TOTAL_ASSETS,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.TOTAL_ASSETS);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.HARDWARE,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.HARDWARE);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.IT_SERVICES,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.IT_SERVICES);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.BACKUP_SERVICES,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.BACKUP_SERVICES);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.UTILIZABLE,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.UTILIZABLE);
      closeMenu?.();
    },
  },
];
export const ticketsMetrics = (setChartMetricType: any) => [
  {
    title: CHART_METRICS?.OPEN_TICKETS,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.OPEN_TICKETS);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.CLOSE_TICKETS,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.CLOSE_TICKETS);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.OVERDUE_TICKETS,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.OVERDUE_TICKETS);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.UNASSIGNED_TICKETS,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.UNASSIGNED_TICKETS);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.RESOLVED_TICKETS,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.RESOLVED_TICKETS);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.PENDING_TICKETS,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.PENDING_TICKETS);
      closeMenu?.();
    },
  },
];
export const contractsMetrics = (setChartMetricType: any) => [
  {
    title: CHART_METRICS?.ALL,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.ALL);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.LEASE,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.LEASE);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.MAINTENANCE,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.MAINTENANCE);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.SOFTWARE_LICENSE,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.SOFTWARE_LICENSE);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.WARRANTY,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.WARRANTY);
      closeMenu?.();
    },
  },
];
export const purchaseOrderMetrics = (setChartMetricType: any) => [
  {
    title: CHART_METRICS?.ALL,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.ALL);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.APPROVED,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.APPROVED);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.REJECTED,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.REJECTED);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.PENDING,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.PENDING);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.RECEIVED,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.RECEIVED);
      closeMenu?.();
    },
  },
];
export const softwareMetrics = (setChartMetricType: any) => [
  {
    title: CHART_METRICS?.TOTAL_SOFTWARE,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.TOTAL_SOFTWARE);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.RESTRICTED,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.RESTRICTED);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.IGNORED,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.RESTRICTED);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.MANAGED,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.RESTRICTED);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.DISABLED,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.RESTRICTED);
      closeMenu?.();
    },
  },
  {
    title: CHART_METRICS?.IN_REVIEW,
    handleClick: (closeMenu: any) => {
      setChartMetricType(CHART_METRICS?.RESTRICTED);
      closeMenu?.();
    },
  },
];
