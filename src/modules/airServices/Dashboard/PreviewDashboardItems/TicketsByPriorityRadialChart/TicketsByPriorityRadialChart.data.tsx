import { TICKET_PRIORITY } from '@/constants/strings';

const radialBarChartData = [100, 55, 67, 83];
const radialBarChartDataOptions: any = {
  labels: Object.values(TICKET_PRIORITY),
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
