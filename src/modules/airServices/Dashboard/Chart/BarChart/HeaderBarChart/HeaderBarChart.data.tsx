export const actionsFunction = (setIsbarChart: any) => [
  {
    title: 'Priority',
    handleClick: () => setIsbarChart(false),
  },
  {
    title: 'Status',
    handleClick: () => setIsbarChart(true),
  },
];
