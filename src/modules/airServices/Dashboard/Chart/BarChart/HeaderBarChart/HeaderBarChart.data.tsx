export const dropDownMenus = (setIsBarChart: any) => [
  {
    title: 'Priority',
    handleClick: () => setIsBarChart(false),
  },
  {
    title: 'Status',
    handleClick: () => setIsBarChart(true),
  },
];
