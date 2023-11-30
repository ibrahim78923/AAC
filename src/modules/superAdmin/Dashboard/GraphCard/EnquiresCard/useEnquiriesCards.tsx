import { useState } from 'react';
import { Theme, useTheme } from '@mui/material';

const useEnquiriesCards = () => {
  const theme = useTheme<Theme>();
  const [series] = useState<any>([65, 35]);

  const [options] = useState<any>({
    chart: {
      width: 450,
      type: 'donut',
    },
    labels: ['Complete', 'Pending'],
    responsive: [
      {
        breakpoint: 769,
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
        return seriesName + ' ' + opts.w.globals.series[opts.seriesIndex] + '%';
      },
    },
    colors: [
      `${theme?.palette?.primary?.main}`,
      `${theme?.palette?.error?.main}`,
    ],
  });

  return {
    series,
    options,
    theme,
  };
};

export default useEnquiriesCards;
