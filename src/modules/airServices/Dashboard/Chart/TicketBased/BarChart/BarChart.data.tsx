export const barChartDataOptions = (theme: any) => ({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  colors: [
    theme?.palette?.custom?.bright,
    theme?.palette?.error?.main,
    theme?.palette?.warning?.main,
    '#35A275',
  ],
  plotOptions: {
    bar: {
      columnWidth: '30%',
      borderRadius: '2',
    },
  },
  legend: {
    offsetY: 5,
  },
});
