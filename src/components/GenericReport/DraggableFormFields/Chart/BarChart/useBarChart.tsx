import { useTheme } from '@mui/material';

export const useBarChart = () => {
  const theme = useTheme();

  const chartOptions = {
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
        columnWidth: '50%',
      },
    },
    dataLabels: {
      enabled: false,
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
      labels: {
        style: {
          fontSize: '12px',
        },
      },
      title: {
        text: 'Months',
        style: {
          fontSize: '14px',
          fontWeight: 600,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
        },
      },
      title: {
        text: 'Number of Deals',
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
