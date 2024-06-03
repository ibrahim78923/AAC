import { Theme, useTheme } from '@mui/material';

const useEnquiriesCards = (details: any) => {
  const theme = useTheme<Theme>();

  const totalCompletePercentage = details
    ?.map((item: any) => item?.totalCompletedPercentage)
    ?.join(', ');
  const totalPendingPercentage = details
    ?.map((item: any) => item?.totalPendingPercentage)
    ?.join(', ');

  const series = [
    Number(totalCompletePercentage),
    Number(totalPendingPercentage),
  ];
  const options: any = {
    chart: {
      width: 450,
      type: 'donut',
    },
    labels: ['Complete', 'Pending'],
    responsive: [
      {
        breakpoint: 375,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    legend: {
      position: 'left',
      fontSize: '14px',
      fontWeight: 500,
      offsetY: 52,
      color: `${theme?.palette?.slateBlue?.main}`,
      itemMargin: {
        vertical: 16,
      },
      markers: {
        width: 38,
        height: 12,
        radius: 5,
      },
      formatter: function (seriesName: any, opts: any) {
        return (
          seriesName + ' ' + opts?.w?.globals?.series[opts?.seriesIndex] + '%'
        );
      },
    },
    colors: [
      `${theme?.palette?.primary?.main}`,
      `${theme?.palette?.error?.main}`,
    ],
  };

  return {
    options,
    series,
    theme,
  };
};

export default useEnquiriesCards;
