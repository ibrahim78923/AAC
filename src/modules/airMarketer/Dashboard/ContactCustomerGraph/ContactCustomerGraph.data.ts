const customYAxisLabels = ['0', '1', '2', '3', '4', '5', '6'];
export const options: any = {
  chart: {
    type: 'bar',
    height: 350,
  },
  colors: ['#47B263', '#74D4CB'],
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
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
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
    name: 'Count of deals',
    data: [44, 55, 57, 56, 61, 58],
  },
  {
    name: 'Closed Deals',
    data: [76, 85, 101, 98, 87, 105],
  },
];
