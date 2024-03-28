const radialBarChartDataOptions = (theme: any) => ({
  labels: ['Low', 'Medium', 'High', 'Urgent'],
  colors: [
    theme?.palette?.warning?.main,
    theme?.palette?.custom?.bright,
    theme?.palette?.success?.main,
    theme?.palette?.error?.main,
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
        },
      },
    },
  },
});
export { radialBarChartDataOptions };
