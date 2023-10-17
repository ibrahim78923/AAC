import { useState } from 'react';
import { Theme, useTheme } from '@mui/material';

const useEnquiriesCards = () => {
  const theme = useTheme<Theme>();
  const [series] = useState([65, 35]);
  const [options] = useState<any>({
    chart: {
      width: 380,
      type: 'donut',
    },
    dataLabels: {
      enabled: true,
    },
    responsive: [
      {
        breakpoint: 480,
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
      position: 'right',
      offsetY: 0,
      height: 100,
    },
    colors: [`${theme.palette.primary.main}`, `${theme.palette.error.main}`],
  });
  return {
    series,
    options,
    theme,
  };
};

export default useEnquiriesCards;
