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

  const parseDate = (dateString: any) => {
    const [month, day, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`).getTime();
  };

  const chartData = [
    {
      x: parseDate('3/37/2'),
      y: 0.1,
    },
    {
      x: parseDate('3/37/3'),
      y: 30,
    },
    {
      x: parseDate('3/37/4'),
      y: 0,
    },
    {
      x: parseDate('3/37/5'),
      y: 20,
    },
    {
      x: parseDate('3/37/6'),
      y: 40,
    },
  ];

  return {
    chartOptions,
    chartData,
    theme,
  };
};

export default useInsightCard;
