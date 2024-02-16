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
export { barChartDataOptions };
