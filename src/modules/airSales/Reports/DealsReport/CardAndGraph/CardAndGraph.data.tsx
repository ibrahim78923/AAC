export const series = [28, 18, 54];

export const options: any = (theme: any) => {
  const colors = [
    `${theme?.palette?.error?.main}`,
    `${theme?.palette?.success?.main}`,
    `${theme?.palette?.custom?.bright}`,
  ];
  return {
    chart: {
      width: 450,
      type: 'pie',
    },
    labels: ['Loss', 'Win', 'Open'],
    colors: colors,

    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 320,
          },
          legend: {
            position: 'bottom',
            itemMargin: {
              vertical: 12,
            },
          },
        },
      },
      {
        breakpoint: 375,
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
    legend: {
      position: 'right',
      fontSize: '14px',
      fontWeight: 500,
      offsetY: 45,
      color: `${theme?.palette?.slateBlue?.main}`,
      itemMargin: {
        vertical: 16,
      },
    },
  };
};

export const seriesBar = [
  {
    name: 'All Deals',
    data: [600, 400, 200, 350, 450, 650, 777, 850, 450, 700, 550, 320],
  },
  {
    name: 'Open Deals',
    data: [900, 750, 250, 320, 570, 700, 750, 650, 880, 780, 351, 890],
  },
  {
    name: 'CloseDeals',
    data: [350, 415, 366, 269, 459, 480, 528, 530, 412, 860, 610, 725],
  },
];

export const optionsBar: any = (theme: any) => {
  const colorsBar = [
    `${theme?.palette?.error?.main}`,
    `${theme?.palette?.success?.main}`,
    `${theme?.palette?.custom?.bright}`,
  ];
  return {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },

    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '40%',
        endingShape: 'rounded',
      },
    },
    colors: colorsBar,

    dataLabels: {
      enabled: false,
    },

    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },

    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'July',
        'Aug',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      itemMargin: {
        horizontal: 16,
      },
      markers: {
        radius: 12,
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val: any) {
          return '$ ' + val + ' thousands';
        },
      },
    },
  };
};
