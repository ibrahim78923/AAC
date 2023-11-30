import { TICKET_STATUS } from '@/constants/strings';

const barChartData = [
  {
    data: [12, 3, 40, 30, 5, 30],
    name: TICKET_STATUS?.PENDING,
  },
  {
    data: [44, 55, 41, 64, 22, 43],
    name: TICKET_STATUS?.CLOSED,
  },
  {
    data: [53, 32, 33, 52, 13, 44],
    name: TICKET_STATUS?.OPEN,
  },
  {
    data: [12, 3, 40, 30, 5, 10],
    name: TICKET_STATUS?.RESOLVED,
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
