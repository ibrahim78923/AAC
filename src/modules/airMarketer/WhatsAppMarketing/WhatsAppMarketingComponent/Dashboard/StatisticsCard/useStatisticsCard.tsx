import { Theme, useTheme } from '@mui/material';

const useStatisticsCard = () => {
  const theme = useTheme<Theme>();

  const series = (graphData: any) => {
    const sentData = graphData?.map((item: any) => item?.sent);
    const deliveredData = graphData?.map((item: any) => item?.delivered);
    const failedData = graphData?.map((item: any) => item?.failed);

    return [
      {
        name: 'Sent',
        data: sentData,
      },
      {
        name: 'Delivered',
        data: deliveredData,
      },
      {
        name: 'Failed',
        data: failedData,
      },
    ];
  };

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
    series,
    options,
    theme,
  };
};

export default useStatisticsCard;
