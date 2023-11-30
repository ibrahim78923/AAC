import { Theme, useTheme } from '@mui/material';

const useStatisticsCard = () => {
  const theme = useTheme<Theme>();
  const series = [
    {
      name: 'Growth Plan',
      data: [44, 55, 57, 56, 61],
    },
    {
      name: 'Premium Plan',

      data: [76, 85, 95, 98, 87],
    },
    {
      name: 'Enterprise Plan',
      data: [35, 41, 36, 26, 45],
    },
    {
      name: 'Free Plan',
      data: [30, 25, 30, 20, 35],
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
      width: 2,
      colors: ['transparent'],
    },

    xaxis: {
      categories: [
        'Air Sales',
        'Air Marketer ',
        'Air Services',
        'Air Operations',
        'Loyalty Program',
      ],
    },
    colors: [
      `${theme?.palette?.success?.main}`,
      `${theme?.palette?.warning?.main}`,
      `${theme?.palette?.error?.main}`,
      `${theme?.palette?.custom?.bright}`,
    ],
    legend: {
      horizontalAlign: 'center',
      itemMargin: {
        vertical: 16,
        horizontal: 49,
      },
      markers: {
        radius: 12,
      },
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
  return {
    series,
    options,
    theme,
  };
};

export default useStatisticsCard;
