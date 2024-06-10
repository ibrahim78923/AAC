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
    description: 'Visualize your data',
  },
  {
    id: '3',
    title: 'Text 1',
    content: 'Default content for the Text 1 goes here.',
    match: 'text',
    description: 'Add context to your report',
  },
  {
    id: '4',
    title: 'Text 2',
    content: 'Default content for the Text 2 goes here.',
    match: 'text',
    description: 'Add context to your report',
  },
  {
    id: '5',
    title: 'Text 3',
    content: 'Default content for the Text 3 goes here.',
    match: 'text',
    description: 'Add context to your report',
  },
  {
    id: '6',
    title: 'Table 1',
    tableColumns: ['Name', 'Channel', 'Status'],
    match: 'table',
    description: 'General Table',
  },
  {
    id: '7',
    title: 'Table 2',
    tableColumns: ['Type', 'Priority', 'Quantity'],
    match: 'table',
    description: 'General Table',
  },
  {
    id: '8',
    title: 'Table 3',
    tableColumns: ['Channel', 'Project Owner', 'Priority'],
    match: 'table',
    description: 'General Table',
  },
];

export const modalInitialState: any = {
  chart: false,
  text: false,
  table: false,
};

export const servicesMetrics = (setMetricType: any) => [
  {
    title: 'Inventories',
    handleClick: (closeMenu: any) => {
      setMetricType('Inventories');
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
    title: 'Tasks',
    handleClick: (closeMenu: any) => {
      setMetricType('Tasks');
      closeMenu?.();
    },
  },
  {
    title: 'Users',
    handleClick: (closeMenu: any) => {
      setMetricType('Users');
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
