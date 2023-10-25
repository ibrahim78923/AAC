export const series = [
  {
    name: 'Air Sales',
    data: [94, 85, 27, 86, 32],
  },
  {
    name: 'Air Marketer',
    data: [74, 55, 27, 56, 61],
  },
  {
    name: 'Air Services',
    data: [64, 45, 97, 16, 32],
  },
  {
    name: 'Air Operations',
    data: [22, 53, 51, 26, 56],
  },
  {
    name: 'Loyalty Program',
    data: [19, 22, 42, 56, 98],
  },
];

export const options: any = {
  chart: {
    type: 'bar',
    height: 350,
  },
  colors: ['#47B263', '#FFC20E', '#FF4A4A', '#0AADC7', '#626E8E'],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '12px',
      endingShape: 'rounded',
    },
  },

  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 5,
    colors: ['transparent'],
  },

  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  },

  fill: {
    opacity: 1,
  },

  tooltip: {
    y: {
      formatter: function (val: any) {
        return '$ ' + val + ' thousands';
      },
    },
  },
};
