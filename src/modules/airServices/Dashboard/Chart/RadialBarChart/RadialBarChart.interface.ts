export interface ApexOptionsI {
  labels: string[];
  colors: string[];
}

export const RadialBarChartDataOptions: any = {
  labels: ['Low', 'Medium', 'High', 'Low'],
  colors: ['#FFC20E', '#FF4A4A', '#35A275', '#0AADC7'],
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
