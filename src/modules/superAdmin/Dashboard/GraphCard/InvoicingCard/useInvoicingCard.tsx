import { Theme, useTheme } from '@mui/material';

const useInvoicingCard = () => {
  const theme = useTheme<Theme>();
  const series = [50.3, 54.1, 41.8];
  const sumOfThreeValues = series.slice(0, 3).reduce((a, b) => a + b, 0);
  const options: any = {
    series: [50.3, 54.1, 41.8],
    chart: {
      type: 'donut',
    },
    colors: ['#47B263', '#FF4A4A', '#0AADC7'],
    plotOptions: {
      pie: {
        startAngle: -110,
        endAngle: 110,
        offsetY: -5,
        donut: {
          labels: {
            show: true,
            total: {
              showAlways: true,
              show: true,
              formatter: function () {
                return '€' + sumOfThreeValues.toFixed(1) + 'k';
              },
            },
          },
        },
        tooltip: {
          show: false,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    labels: ['Invoice paid', 'Follow up soon', 'Follow up now'],
    grid: {
      padding: {
        bottom: -80,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    label: ['Total'],
  };
  return {
    options,
    theme,
  };
};

export default useInvoicingCard;
