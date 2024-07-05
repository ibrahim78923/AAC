import { STATICTICS_STATUS } from '@/constants/strings';
import { Theme, useTheme } from '@mui/material';

const useStatisticsCard = (whatsappAnalytics: any) => {
  const theme = useTheme<Theme>();

  const series = [
    {
      name: 'Received',
      data: [20, 10, 45, 58, 47, 56, 45, 58, 48, 57, 40, 60],
    },
    {
      name: 'Sent',
      data: [10, 41, 36, 26, 45, 35, 41, 36, 26, 45, 55, 70],
    },
    {
      name: 'Failed',
      data: [15, 25, 30, 20, 35, 30, 25, 30, 20, 35, 40, 50],
    },
  ];

  const updatedSeries = series?.map((serie) => {
    if (serie?.name === STATICTICS_STATUS?.RECIEVED) {
      return {
        ...serie,
        data: whatsappAnalytics?.map((item: any) => item?.delivered),
      };
    } else if (serie?.name === STATICTICS_STATUS?.SENT) {
      return {
        ...serie,
        data: whatsappAnalytics?.map((item: any) => item?.sent),
      };
    } else if (serie?.name === STATICTICS_STATUS?.FAILED) {
      return {
        ...serie,
        data: whatsappAnalytics?.map((item: any) => item?.failed),
      };
    } else {
      return serie;
    }
  });

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
      position: 'top',
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
    updatedSeries,
    options,
    theme,
  };
};

export default useStatisticsCard;
