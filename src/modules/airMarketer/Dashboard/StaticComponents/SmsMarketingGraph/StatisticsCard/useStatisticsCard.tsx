import { Theme, useTheme } from '@mui/material';

const useStatisticsCard = ({ data }: any) => {
  const theme = useTheme<Theme>();

  const transformedData = {
    delivered: data?.statistics?.map((item: any) => item?.delivered),
    sent: data?.statistics?.map((item: any) => item?.sent),
    failed: data?.statistics?.map((item: any) => item?.failed),
  };

  const series = [
    {
      name: 'Delivered',
      data: transformedData.delivered,
    },
    {
      name: 'Sent',
      data: transformedData.sent,
    },
    {
      name: 'Failed',
      data: transformedData.failed,
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
  };
  return {
    options,
    series,
    theme,
  };
};

export default useStatisticsCard;
