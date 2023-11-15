import { Theme, useTheme } from '@mui/material';

const useStatisticsCard = () => {
  const theme = useTheme<Theme>();

  const series = [
    {
      name: 'Sent',
      data: [76, 85, 88, 98, 87, 76, 85, 88, 98, 87, 60, 50],
    },
    {
      name: 'Delivered',
      data: [35, 41, 36, 26, 45, 35, 41, 36, 26, 45, 55, 70],
    },
    {
      name: 'Failed',
      data: [30, 25, 30, 20, 35, 30, 25, 30, 20, 35, 40, 90],
    },
  ];

  const options: any = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30%',
        endingShape: 'rounded',
      },
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 3,
      colors: ['transparent'],
    },

    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    colors: [
      `${theme?.palette?.success?.main}`,
      `${theme?.palette?.warning?.main}`,
      `${theme?.palette?.error?.main}`,
    ],
    legend: {
      horizontalAlign: 'left',
      itemMargin: {
        vertical: 16,
        horizontal: 16,
      },
      markers: {
        radius: 12,
      },
    },
    fill: {
      opacity: 1,
    },
    // tooltip: {
    //   y: {
    //     formatter: function (val: any) {
    //       return '$ ' + val + ' thousands';
    //     },
    //   },
    // },
  };
  return {
    series,
    options,
    theme,
  };
};

export default useStatisticsCard;
