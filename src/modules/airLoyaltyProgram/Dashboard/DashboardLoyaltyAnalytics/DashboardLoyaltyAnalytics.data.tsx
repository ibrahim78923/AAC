export const loyaltyAnalyticsData = [
  {
    data: [12, 3, 40, 30, 5, 30, 44, 55, 41, 4, 22, 43],
    name: 'Contacts',
  },
  {
    data: [44, 55, 41, 4, 22, 43, 12, 3, 40, 30, 5, 30],
    name: 'Earnings',
  },
  {
    data: [53, 32, 33, 52, 13, 44, 12, 3, 40, 30, 5, 10],
    name: 'Spending',
  },
];

export const loyaltyAnalyticsDataOptions = (theme: any): any => ({
  labels: [
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
  xaxis: {
    crosshairs: {
      show: false,
    },
  },
  colors: [
    theme?.palette?.blue?.main,
    theme?.palette?.primary?.main,
    theme?.palette?.graph?.Trash_bg,
  ],
  yaxis: {
    forceNiceScale: false,
    max: 100,
    labels: {
      formatter: (value: any) => {
        if (isNaN(value)) return value;
        return value?.toFixed(0) + '%';
      },
    },
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    markers: {
      width: 12,
      height: 12,
      radius: 4,
    },
  },
  states: {
    hover: {
      filter: {
        type: 'none',
      },
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '30%',
      borderRadius: 6,
      borderRadiusApplication: 'end',
    },
  },
  responsive: [
    {
      breakpoint: 1600,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 2,
          },
        },
      },
    },
    {
      breakpoint: 1200,
      options: {
        chart: {
          height: 650,
        },
        plotOptions: {
          bar: {
            horizontal: true,
            borderRadius: 2,
          },
        },
        xaxis: {
          forceNiceScale: false,
          max: 100,
          labels: {
            formatter: (value: any) => value?.toFixed(0) + '%',
          },
        },
        yaxis: {
          crosshairs: {
            show: false,
          },
        },
      },
    },
  ],
});
