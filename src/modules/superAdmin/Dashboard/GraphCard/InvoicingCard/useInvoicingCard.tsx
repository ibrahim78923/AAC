import { useState } from 'react';

import { Theme, useTheme } from '@mui/material';

const useInvoicingCard = () => {
  const theme = useTheme<Theme>();

  const [series] = useState([100]);
  const [options] = useState<any>({
    chart: {
      height: 350,
      type: 'radialBar',
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: '70%',
          background: '#fff',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24,
          },
        },
        track: {
          background: '#fff',
          strokeWidth: '67%',
          margin: 0,
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35,
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: '#888',
              fontSize: '17px',
            },
            value: {
              formatter: function (val: any) {
                return parseInt(val);
              },
              color: '#111',
              fontSize: '36px',
              show: true,
            },
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0,
        gradientToColors: [
          `${theme.palette.error.main}`,
          `${theme?.palette?.custom.bright}`,
          `${theme?.palette?.success.main}`,
        ],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 200],
      },
    },
    stroke: {
      lineCap: 'round',
    },
    labels: ['Total Revenue'],
  });
  return {
    series,
    options,
    theme,
  };
};

export default useInvoicingCard;
