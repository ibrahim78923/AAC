const radialBarChartData = [100, 55, 67, 83];
const radialBarChartDataOptions = (theme: any) => ({
  labels: ['Low', 'Medium', 'High', 'Urgent'],
  colors: [
    theme?.palette?.custom?.bright,
    theme?.palette?.error?.main,
    theme?.palette?.warning?.main,
    '#35A275', //This color is not available in palette
  ],
  plotOptions: {
    radialBar: {
      dataLabels: {
        name: {
          fontSize: '22px',
        },
        value: {
          fontSize: '16px',
        },
        total: {
          show: true,
          label: '15 Tickets',
          formatter: function () {
            return;
          },
        },
      },
    },
  },
});
export { radialBarChartData, radialBarChartDataOptions };
