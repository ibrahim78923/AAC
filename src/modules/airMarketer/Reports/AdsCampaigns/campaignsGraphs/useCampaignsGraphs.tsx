import { useTheme } from '@mui/material';

const useCampaignsGraphs = () => {
  const theme = useTheme();

  const series = [
    {
      name: 'LinkedIn',
      data: [52, 38, 24, 33, 26, 40],
    },
    {
      name: 'Facebook',
      data: [41, 62, 42, 13, 40],
    },
    {
      name: 'Google',
      data: [57, 74, 99, 75, 40],
    },
  ];

  const options: any = {
    chart: {
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [5, 7, 5],
      curve: 'straight',
    },
    title: {
      text: 'Total Add Spend',
      align: 'left',
    },
    legend: {
      tooltipHoverFormatter: function (val: any, opts: any) {
        return (
          val +
          ' - ' +
          opts?.w?.globals?.series[opts?.seriesIndex][opts?.dataPointIndex] +
          ''
        );
      },
    },
    markers: {
      size: 1,
      hover: {
        sizeOffset: 6,
      },
    },
    xaxis: {
      categories: ['Jul2021', 'Sep2021', 'Nov2021', 'Jan2021', 'Mar2021'],
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (val: any) {
              return val + ' (mins)';
            },
          },
        },
        {
          title: {
            formatter: function (val: any) {
              return val + ' per session';
            },
          },
        },
        {
          title: {
            formatter: function (val: any) {
              return val;
            },
          },
        },
      ],
    },
  };

  const totalAddSpendseries = [
    {
      name: 'Cost',
      data: [94, 85, 27],
    },
  ];

  const totalAddSpendoptions: any = {
    colors: [theme?.palette?.primary?.main],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30px',
        endingShape: 'rounded',
      },
    },
    title: {
      text: 'Add Spend Over Time',
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
      categories: ['Google ads', 'Facebook', 'LinkedIn'],
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

  return {
    series,
    options,
    totalAddSpendseries,
    totalAddSpendoptions,
  };
};

export default useCampaignsGraphs;
