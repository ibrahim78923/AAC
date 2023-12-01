export const series = [
  {
    name: 'Google Ads',
    data: [],
  },
  {
    name: 'LinkedIn',
    data: [],
  },
];

export const options: any = (theme: any) => ({
  chart: {
    type: 'bar',
    height: 350,
    margin: '90px',
  },
  colors: [theme?.success?.main, theme?.custom?.bright],
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
    categories: ['Google Ads', 'Facebook', 'LinkedIn'],
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
