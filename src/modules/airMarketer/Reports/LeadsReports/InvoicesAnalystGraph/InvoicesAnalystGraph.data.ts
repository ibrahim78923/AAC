export const series = [
  {
    name: 'Air Sales',
    data: [476, 354, 274, 678, 464, 775],
  },
  {
    name: 'Air Marketer',
    data: [692, 675, 557, 445, 344, 875],
  },
  {
    name: 'Air Services',
    data: [164, 145, 227, 667, 564, 275],
  },
  {
    name: 'Air Services',
    data: [264, 245, 117, 667, 164, 475],
  },
  {
    name: 'Air Services',
    data: [364, 345, 107, 667, 964, 175],
  },
  {
    name: 'Air Services',
    data: [464, 445, 397, 667, 111, 775],
  },
  {
    name: 'Air Services',
    data: [264, 545, 274, 667, 664, 275],
  },
];

export const options: any = {
  chart: {
    type: 'bar',
    height: 350,
  },
  colors: ['#47B263', '#0AADC7', '#FF4A4A', 'yellow', 'green', 'blue'],
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
    width: 8,
    colors: ['transparent'],
  },

  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
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
