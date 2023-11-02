const barChartData = [
  {
    data: [12, 3, 40, 30, 5, 30],
    name: 'Pending',
  },
  {
    data: [44, 55, 41, 64, 22, 43],
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

const barChartDataOptions: any = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  colors: ['#0AADC7', '#FF4A4A', '#FFC20E', '#35A275'],
  plotOptions: {
    bar: {
      columnWidth: '30%',
    },
  },
};

export { barChartData, barChartDataOptions };
