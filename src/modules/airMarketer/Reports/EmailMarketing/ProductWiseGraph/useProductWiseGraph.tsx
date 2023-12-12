import { useTheme } from '@mui/material';

const useProductWiseGraph = () => {
  const theme: any = useTheme();
  const series = [
    {
      name: 'Unsubscribe',
      data: [94, 85, 27, 86, 32, 40, 60, 80, 90, 100, 20, 30],
    },
    {
      name: 'Subscribe',
      data: [74, 55, 27, 56, 61, 40, 60, 80, 90, 100, 20, 30],
    },
  ];

  const options: any = {
    chart: {
      type: 'bar',
      height: 350,
    },
    colors: [theme?.palette?.grey[0], theme?.palette?.custom?.bright],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '20px',
        endingShape: 'rounded',
      },
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 0,
      colors: ['transparent'],
    },

    xaxis: {
      categories: [0, 3, 5, 8, 10, 13, 15, 18, 20, 23, 27, 30],
    },

    fill: {
      opacity: 1,
    },

    tooltip: {
      y: {
        formatter: function (val: any) {
          return val;
        },
      },
    },
  };
  const emailReviewOptions = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: 'Product Trends by Month',
      align: 'left',
    },
    grid: {
      row: {
        colors: [, 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
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
      ],
    },
  };

  const emailReviewSeries = [
    {
      name: 'Bounced:10',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
    {
      name: 'Clicked:02',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
    {
      name: 'Delivered:05',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
    {
      name: 'Open:03',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
    {
      name: 'Sent:15',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ];

  const emailOverviewData = {
    series: [
      {
        name: 'Desktops',
        data: [10, 51, 30, 20, 30, 70, 49, 30, 10],
      },
    ],
    options: {
      chart: {
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Product Trends by Month',
        align: 'left',
      },
      grid: {
        row: {
          colors: [theme?.palette?.custom?.white_smoke, 'transparent'],
          opacity: 0.5,
        },
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
        ],
      },
    },
  };

  return {
    emailOverviewData,
    series,
    options,
    emailReviewSeries,
    emailReviewOptions,
  };
};

export default useProductWiseGraph;
