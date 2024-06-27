import { useTheme } from '@mui/material';

export const useHorizontalBarChart = () => {
  const theme = useTheme();
  const chartOptions = {
    chart: {
      type: 'bar',
      height: 450,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '50%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ['John Doe', 'John Smith', 'Mahesh Reddy'],
      labels: {
        style: {
          fontSize: '12px',
        },
        formatter: function (value: any) {
          return `£${value.toLocaleString()}`;
        },
      },
      title: {
        text: 'Revenue',
        style: {
          fontSize: '14px',
          fontWeight: 600,
        },
      },
    },
    yaxis: {
      labels: {
        maxWidth: 200,
        style: {
          fontSize: '12px',
        },
      },
      title: {
        text: 'Owner',
        style: {
          fontSize: '14px',
          fontWeight: 600,
        },
      },
    },
    legend: {
      offsetY: 5,
    },
    colors: [theme?.palette?.primary?.main, theme?.palette?.blue?.link_blue],
  };

  return { chartOptions };
};
