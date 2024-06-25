export const fieldsList = [
  {
    id: '0',
    title: 'Chart',
    match: 'chart',
    description: 'Visualize your data',
  },
  {
    id: '1',
    title: 'Text',
    match: 'text',
    description: 'Add context to your report',
  },
  {
    id: '2',
    title: 'Table',
    match: 'table',
    description: 'General Table',
  },
];

export const templateList = [
  {
    id: '0',
    title: 'Bar Chart',
    type: 'Bar Chart',
    xAxis: 'Task Owner',
    yAxis: 'Status',
    subMetric: 'Users',
    subFilter: true,
    match: 'chart',
    templateType: 'All',
    description: 'Visualize your data',
  },
  {
    id: '1',
    title: 'Pie Chart',
    type: 'Pie Chart',
    xAxis: 'Task Owner',
    yAxis: 'Status',
    subMetric: 'Tickets',
    subFilter: true,
    match: 'chart',
    templateType: 'All',
    description: 'Visualize your data',
  },
  {
    id: '2',
    title: 'Donut Chart',
    type: 'Donut Chart',
    xAxis: 'Task Owner',
    yAxis: 'Status',
    subMetric: 'Tasks',
    subFilter: true,
    match: 'chart',
    templateType: 'All',
    description: 'Visualize your data',
  },
  {
    id: '3',
    title: 'Text',
    content: 'Default content for the Text 1 goes here.',
    match: 'text',
    templateType: 'All',
    description: 'Add context to your report',
  },
  {
    id: '4',
    title: 'Table',
    tableColumns: ['Name', 'Channel', 'Status'],
    match: 'table',
    templateType: 'All',
    description: 'General Table',
  },
  {
    id: '5',
    title: 'Open',
    ticketCount: '0',
    match: 'counter',
    templateType: 'Tickets',
    description: 'Tickets',
  },
  {
    id: '6',
    title: 'Close',
    ticketCount: '12',
    match: 'counter',
    templateType: 'Tickets',
    description: 'Tickets',
  },
  {
    id: '7',
    title: 'Over Due',
    ticketCount: '1',
    match: 'counter',
    templateType: 'Tickets',
    description: 'Tickets',
  },
  {
    id: '8',
    title: 'Unassigned',
    ticketCount: '0',
    match: 'counter',
    templateType: 'Tickets',
    description: 'Tickets',
  },
  {
    id: '9',
    title: 'Resolved',
    ticketCount: '15',
    match: 'counter',
    templateType: 'Tickets',
    description: 'Tickets',
  },
  {
    id: '10',
    title: 'pending',
    ticketCount: '0',
    match: 'counter',
    templateType: 'Tickets',
    description: 'Tickets',
  },
  {
    id: '11',
    title: 'Total Assets',
    ticketCount: '10',
    match: 'counter',
    templateType: 'Inventory',
    description: 'Inventory Assets',
  },
  {
    id: '12',
    title: 'Hardware',
    ticketCount: '9',
    match: 'counter',
    templateType: 'Inventory',
    description: 'Inventory Assets',
  },
  {
    id: '13',
    title: 'IT Services',
    ticketCount: '8',
    match: 'counter',
    templateType: 'Inventory',
    description: 'Inventory Assets',
  },
  {
    id: '14',
    title: 'Backup Services',
    ticketCount: '7',
    match: 'counter',
    templateType: 'Inventory',
    description: 'Inventory Assets',
  },
  {
    id: '15',
    title: 'Utilizable',
    ticketCount: '6',
    match: 'counter',
    templateType: 'Inventory',
    description: 'Inventory Assets',
  },
  {
    id: '16',
    title: 'Total Software',
    ticketCount: '0',
    match: 'counter',
    templateType: 'Software',
    description: 'Software Report',
  },
  {
    id: '17',
    title: 'Restricted',
    ticketCount: '10',
    match: 'counter',
    templateType: 'Software',
    description: 'Software Report',
  },
  {
    id: '18',
    title: 'Ignored',
    ticketCount: '9',
    match: 'counter',
    templateType: 'Software',
    description: 'Software Report',
  },
  {
    id: '19',
    title: 'Managed',
    ticketCount: '8',
    match: 'counter',
    templateType: 'Software',
    description: 'Software Report',
  },
  {
    id: '20',
    title: 'Disabled',
    ticketCount: '7',
    match: 'counter',
    templateType: 'Software',
    description: 'Software Report',
  },
  {
    id: '21',
    title: 'InReview',
    ticketCount: '6',
    match: 'counter',
    templateType: 'Software',
    description: 'Software Report',
  },

  {
    id: '22',
    title: 'All',
    ticketCount: '6',
    match: 'counter',
    templateType: 'Contract',
    description: 'Contract',
  },
  {
    id: '23',
    title: 'Lease',
    ticketCount: '6',
    match: 'counter',
    templateType: 'Contract',
    description: 'Contract',
  },
  {
    id: '24',
    title: 'Maintain',
    ticketCount: '6',
    match: 'counter',
    templateType: 'Contract',
    description: 'Contract',
  },
  {
    id: '25',
    title: 'Software',
    ticketCount: '6',
    match: 'counter',
    templateType: 'Contract',
    description: 'Contract',
  },
  {
    id: '26',
    title: 'Warranty',
    ticketCount: '6',
    match: 'counter',
    templateType: 'Contract',
    description: 'Contract',
  },

  {
    id: '27',
    title: 'All',
    ticketCount: '6',
    match: 'counter',
    templateType: 'Purchase Order',
    description: 'Purchase Order',
  },
  {
    id: '28',
    title: 'Approved',
    ticketCount: '6',
    match: 'counter',
    templateType: 'Purchase Order',
    description: 'Purchase Order',
  },
  {
    id: '29',
    title: 'rejected',
    ticketCount: '6',
    match: 'counter',
    templateType: 'Purchase Order',
    description: 'Purchase Order',
  },
  {
    id: '30',
    title: 'Pending',
    ticketCount: '6',
    match: 'counter',
    templateType: 'Purchase Order',
    description: 'Purchase Order',
  },
  {
    id: '31',
    title: 'Received',
    ticketCount: '6',
    match: 'counter',
    templateType: 'Purchase Order',
    description: 'Purchase Order',
  },
];

export const modalInitialState: any = {
  chart: false,
  text: false,
  table: false,
  counter: false,
};

export const marketingMetrics = (setMetricType: any) => [
  {
    title: 'Inventory',
    handleClick: (closeMenu: any) => {
      setMetricType('Inventory');
      closeMenu?.();
    },
  },
  {
    title: 'Software',
    handleClick: (closeMenu: any) => {
      setMetricType('Software');
      closeMenu?.();
    },
  },
  {
    title: 'Contract',
    handleClick: (closeMenu: any) => {
      setMetricType('Contract');
      closeMenu?.();
    },
  },
  {
    title: 'Tickets',
    handleClick: (closeMenu: any) => {
      setMetricType('Tickets');
      closeMenu?.();
    },
  },
  {
    title: 'Purchase Order',
    handleClick: (closeMenu: any) => {
      setMetricType('Purchase Order');
      closeMenu?.();
    },
  },
];
export const ActionDropDownData = () => [
  {
    id: 1,
    title: 'Customize',
  },
  {
    id: 2,
    title: 'Rename',
  },
  {
    id: 3,
    title: 'Clone',
  },
  {
    id: 4,
    title: '  Export',
  },
  {
    id: 5,
    title: 'Email this Report',
  },
  {
    id: 6,
    title: 'Change Owner',
  },
  {
    id: 7,
    title: 'Add to Dashboard',
  },
  {
    id: 8,
    title: 'Clone',
  },
  {
    id: 9,
    title: 'Delete',
  },
  {
    id: 10,
    title: 'Add to favorite',
  },
  {
    id: 11,
    title: 'Manage Access',
  },
];
