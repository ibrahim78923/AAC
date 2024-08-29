import { useTheme } from '@mui/material';

const customYAxisLabels = ['0', '1', '2', '3', '4', '5', '6'];
// const monthNames = [
//   'Jan',
//   'Feb',
//   'Mar',
//   'Apr',
//   'May',
//   'Jun',
//   'Jul',
//   'Aug',
//   'Sep',
//   'Oct',
//   'Nov',
//   'Dec',
// ];

export const options: any = (dataArray: any) => {
  const theme = useTheme();
  return {
    chart: {
      type: 'bar',
      height: 350,
    },
    colors: [
      `${theme.palette.success.main}`,
      `${theme?.palette?.custom?.light_green_bg_three}`,
    ],
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
      categories: dataArray ? dataArray?.map((item: any) => item?.month) : [],
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
};

export const series = (dataArray: any) => {
  return [
    {
      name: 'Open Deals',
      data: dataArray ? dataArray?.map((item: any) => item?.openDeals) : [],
    },
    {
      name: 'Closed Deals',
      data: dataArray ? dataArray?.map((item: any) => item?.closedDeals) : [],
    },
  ];
};
