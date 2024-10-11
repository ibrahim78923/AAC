import { STATICTICS_STATUS } from '@/constants/strings';
import { Theme, useTheme } from '@mui/material';

const useStatisticsCard = (whatsappAnalytics: any) => {
  const theme = useTheme<Theme>();

  const series = [{ name: 'Received' }, { name: 'Sent' }, { name: 'Failed' }];

  const updatedSeries: any = series?.map((serie) => {
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
