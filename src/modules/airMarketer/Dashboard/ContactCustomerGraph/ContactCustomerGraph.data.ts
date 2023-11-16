const customYAxisLabels = ['0', '10', '20', '30', '40', '50', '60'];
export const options: any = {
  chart: {
    type: 'bar',
    height: 350,
  },
  colors: ['#35456D', '#74D4CB'],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '45%',
      endingShape: 'rounded',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 11,
    colors: ['transparent'],
  },
  xaxis: {
    categories: [
      '4/18/2023',
      '5/18/2023',
      '6/18/2023',
      '7/18/2023',
      '8/18/2023',
      '9/18/2023',
    ],
  },
  yaxis: {
    labels: {
      formatter: function (value: any, index: any) {
        return customYAxisLabels[index];
      },
    },
  },
  tooltip: {
    y: {
      formatter: function (val: any) {
        return '$ ' + val + ' thousands';
      },
    },
  },
};
export const series: any = [
  {
    name: 'Customers',
    data: [44, 55, 57, 56, 61, 58],
  },
  {
    name: 'Earnings',
    data: [76, 85, 101, 98, 87, 105],
  },
];
