import { Theme, useTheme } from '@mui/material';

const useInsightCard = () => {
  const theme = useTheme<Theme>();

  const chartOptions: any = {
    chart: {
      type: 'bar',
      height: 450,
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: function (value: any) {
          return new Date(value).toLocaleDateString();
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        barWidth: 20,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 0.3,
      colors: ['transparent'],
    },
    fill: {
      opacity: 0.8,
    },
  };

  const chartData = [
    {
      x: new Date('2022-01-01').getTime(),
      y: 0,
    },
    {
      x: new Date('2022-01-02').getTime(),
      y: 30,
    },
    {
      x: new Date('2022-01-03').getTime(),
      y: 0,
    },
  ];

  return {
    chartOptions,
    chartData,
    theme,
  };
};

export default useInsightCard;
