const barChartData = [
  {
    data: [12, 3, 40, 30, 5, 30],
    name: 'Pending',
  },
  {
    data: [44, 55, 41, 4, 22, 43],
    name: 'Closed',
  },
  {
    data: [53, 32, 33, 52, 13, 44],
    name: 'Open',
  },
  {
    data: [12, 3, 40, 30, 5, 10],
    name: 'Resolved',
  },
];

const barChartDataOptions = (theme: any) => ({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  colors: [
    theme?.palette?.custom?.bright,
    theme?.palette?.error?.main,
    theme?.palette?.warning?.main,
    '#35A275', //This color is not available in palette
  ],

  plotOptions: {
    bar: {
      columnWidth: '30%',
    },
  },
});
export { barChartData, barChartDataOptions };
