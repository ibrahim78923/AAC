export const series = [
  {
    name: 'Air Sales',
    data: [476, 354, 274, 678],
  },
  {
    name: 'Air Marketer',
    data: [692, 675, 557, 445],
  },
  {
    name: 'Air Services',
    data: [264, 545, 297, 667],
  },
];

export const options: any = {
  chart: {
    type: 'bar',
    height: 350,
  },
  colors: ['#47B263', '#0AADC7', '#FF4A4A'],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '18px',
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
    categories: ['1st week', '2nd week', '3rd week', '4th week'],
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
