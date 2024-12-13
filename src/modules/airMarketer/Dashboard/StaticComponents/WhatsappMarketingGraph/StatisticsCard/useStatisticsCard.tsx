import { Theme, useTheme } from '@mui/material';

const STATICTICS_STATUS = {
  RECEIVED: 'Received',
  SENT: 'Sent',
  FAILED: 'Failed',
};

const useStatisticsCard = (data: any) => {
  const theme = useTheme<Theme>();

  // Define series names
  const series = [
    { name: STATICTICS_STATUS.RECEIVED },
    { name: STATICTICS_STATUS.SENT },
    { name: STATICTICS_STATUS.FAILED },
  ];

  // Map apiData to series
  const updatedSeries = series?.map((ele) => {
    if (ele.name === STATICTICS_STATUS?.RECEIVED) {
      return {
        ...ele,
        data: data?.map((item: any) => item?.delivered),
      };
    } else if (ele.name === STATICTICS_STATUS?.SENT) {
      return {
        ...ele,
        data: data?.map((item: any) => item?.sent),
      };
    } else if (ele.name === STATICTICS_STATUS?.FAILED) {
      return {
        ...ele,
        data: data?.map((item: any) => item?.failed),
      };
    } else {
      return ele;
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
