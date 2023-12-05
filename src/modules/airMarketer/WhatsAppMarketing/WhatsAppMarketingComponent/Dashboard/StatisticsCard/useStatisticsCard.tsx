import { Theme, useTheme } from '@mui/material';

const useStatisticsCard = () => {
  const theme = useTheme<Theme>();

  const series = [
    {
      name: 'Recieved',
      data: [20, 10, 45, 58, 47, 56, 45, 58, 48, 57, 40, 60],
    },
    {
      name: 'send',
      data: [10, 41, 36, 26, 45, 35, 41, 36, 26, 45, 55, 70],
    },
    {
      name: 'Failed',
      data: [15, 25, 30, 20, 35, 30, 25, 30, 20, 35, 40, 50],
    },
  ];

  const options: any = {
    chart: {
      type: 'area',
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
      curve: 'smooth',
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
      horizontalAlign: 'right',
      verticalAlign: 'top',
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
  };
  return {
    series,
    options,
    theme,
  };
};

export default useStatisticsCard;
