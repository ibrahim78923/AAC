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
