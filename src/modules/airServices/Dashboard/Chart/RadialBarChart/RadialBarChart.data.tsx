const radialBarChartData = [100, 55, 67, 83];
const radialBarChartDataOptions: any = {
  labels: ['Low', 'Medium', 'High', 'Urgent'],
  colors: ['#FFC20E', '#0AADC7', '#35A275', '#FF4A4A'],
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
};
export { radialBarChartData, radialBarChartDataOptions };
