export const series = [
  {
    name: 'Google Ads',
    data: [0.75, 0.65, 1, 0.2, 0.1, 0.61],
  },
  {
    name: 'LinkedIn',
    data: [0.85, 0.29, 0.45, 1, 0.89, 0.49],
  },
];

export const options: any = (theme: any) => ({
  chart: {
    type: 'bar',
    height: 350,
    margin: '90px',
  },
  colors: [theme?.palette?.custom?.main, theme?.palette?.custom?.bright],
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
    categories: [
      '4/19/2023',
      '4/19/2023',
      '4/19/2023',
      '4/19/2023',
      '4/19/2023',
      '4/19/2023',
    ],
    labels: {
      rotate: -45,
    },
  },
  yaxis: {
    title: {
      text: 'Cost',
    },
  },
  fill: {
    opacity: 1,
  },
});
