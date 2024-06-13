export const servicesChartMetrics = (setChartMetricType: any) => [
  {
    title: 'Inventories',
    handleClick: (closeMenu: any) => {
      setChartMetricType('Inventories');
      closeMenu?.();
    },
  },
  {
    title: 'Tickets',
    handleClick: (closeMenu: any) => {
      setChartMetricType('Tickets');
      closeMenu?.();
    },
  },
  {
    title: 'Tasks',
    handleClick: (closeMenu: any) => {
      setChartMetricType('Tasks');
      closeMenu?.();
    },
  },
  {
    title: 'Users',
    handleClick: (closeMenu: any) => {
      setChartMetricType('Users');
      closeMenu?.();
    },
  },
];
