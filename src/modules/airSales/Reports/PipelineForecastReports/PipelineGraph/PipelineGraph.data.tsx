export const totalSeriesBar = (generateRandomNumbers: any) => {
  return [
    {
      name: 'New (sales pipeline)',
      data: generateRandomNumbers(0, 22000, 2),
    },
    {
      name: 'Follow Up (sales pipeline)',
      data: generateRandomNumbers(0, 22000, 2),
    },
    {
      name: 'Follow Up (sales pipeline)',
      data: generateRandomNumbers(0, 22000, 2),
    },
    {
      name: 'Under Review (sales pipeline)',
      data: generateRandomNumbers(0, 22000, 2),
    },
    {
      name: 'Demo (sales pipeline)',
      data: generateRandomNumbers(0, 22000, 2),
    },
    {
      name: 'Negotiation (sales pipeline)',
      data: generateRandomNumbers(0, 22000, 2),
    },
    {
      name: 'Won (sales pipeline)',
      data: generateRandomNumbers(0, 22000, 2),
    },
    {
      name: 'Lost (sales pipeline)',
      data: generateRandomNumbers(0, 22000, 2),
    },
  ];
};

export const totalOptionsBar: any = (theme: any) => {
  const colorsBar = [
    `${theme?.palette?.custom?.graph_blue}`,
    `${theme?.palette?.custom?.light_lighter}`,
    `${theme?.palette?.custom?.ext_dark_blue}`,
    `${theme?.palette?.custom?.turquoise_Blue}`,
    `${theme?.palette?.error?.main}`,
    `${theme?.palette?.success?.main}`,
    `${theme?.palette?.custom?.bright}`,
  ];
  return {
    chart: {
      type: 'bar',
      toolbar: {
        show: true,
      },
    },

    plotOptions: {
      bar: {
        horizontal: true,
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
      categories: ['John Doe', 'Feb', 'Mar'],
    },
    yaxis: {
      title: {
        text: 'Deal owner',
      },
    },
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
    ],
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

export const comparisonSeriesBar = [
  {
    name: 'New (sales pipeline)',
    data: [
      0.08, 0.25, 0.65, 0.87, 1.15, 1.23, 0.63, 0.32, 0.29, 0.99, 1.23, 1.09,
    ],
  },
  {
    name: 'Follow Up (sales pipeline)',
    data: [
      0.04, 0.25, 0.65, 0.87, 1.15, 1.23, 0.63, 0.32, 0.29, 0.99, 1.23, 1.09,
    ],
  },
  {
    name: 'Under Review (sales pipeline)',
    data: [
      0.09, 0.25, 0.65, 0.87, 1.15, 1.23, 0.63, 0.32, 0.29, 0.99, 1.23, 1.09,
    ],
  },
  {
    name: 'Demo (sales pipeline)',
    data: [
      0.09, 0.25, 0.65, 0.87, 1.15, 1.23, 0.63, 0.32, 0.29, 0.99, 1.23, 1.09,
    ],
  },
  {
    name: 'Negotiation (sales pipeline)',
    data: [
      0.09, 0.25, 0.65, 0.87, 1.15, 1.23, 0.63, 0.32, 0.29, 0.99, 1.23, 1.09,
    ],
  },
  {
    name: 'Won (sales pipeline)',
    data: [
      0.09, 0.25, 0.65, 0.87, 1.15, 1.23, 0.63, 0.32, 0.29, 0.99, 1.23, 1.09,
    ],
  },
  {
    name: 'Lost (sales pipeline)',
    data: [
      0.09, 0.25, 0.65, 0.87, 1.15, 1.23, 0.63, 0.32, 0.29, 0.99, 1.23, 1.09,
    ],
  },
];

export const comparisonOptionsBar: any = (theme: any) => {
  const colorsBar = [
    `${theme?.palette?.custom?.bright}`,
    `${theme?.palette?.success?.main}`,
    `${theme?.palette?.error?.main}`,
    `${theme?.palette?.custom?.turquoise_Blue}`,
    `${theme?.palette?.custom?.ext_dark_blue}`,
    `${theme?.palette?.custom?.light_lighter}`,
    `${theme?.palette?.custom?.graph_blue}`,
  ];
  return {
    chart: {
      type: 'bar',
      toolbar: {
        show: true,
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
    yaxis: {
      title: {
        text: 'Total revenue goal',
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
        'July',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
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
    ],
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

export const overtimeSeriesBar = [
  {
    name: 'Incremental',
    data: [
      1000, 4000, 10000, 15000, 18000, 24000, 26000, 29000, 1000, 4000, 10000,
      15000, 18000, 24000, 26000, 29000, 1000, 4000, 10000, 15000, 18000, 24000,
      26000, 29000, 1000, 4000, 10000, 15000, 18000, 24000, 26000,
    ],
  },
  {
    name: 'New (sales pipeline)',
    data: [
      1000, 4000, 10000, 15000, 18000, 24000, 26000, 29000, 1000, 4000, 10000,
      15000, 18000, 24000, 26000, 29000, 1000, 4000, 10000, 15000, 18000, 24000,
      26000, 29000, 1000, 4000, 10000, 15000, 18000, 24000, 26000,
    ],
  },
  {
    name: 'Follow Up (sales pipeline)',
    data: [
      1000, 4000, 10000, 15000, 18000, 24000, 26000, 29000, 1000, 4000, 10000,
      15000, 18000, 24000, 26000, 29000, 1000, 4000, 10000, 15000, 18000, 24000,
      26000, 29000, 1000, 4000, 10000, 15000, 18000, 24000, 26000,
    ],
  },
  {
    name: 'Under Review (sales pipeline)',
    data: [
      1000, 4000, 10000, 15000, 18000, 24000, 26000, 29000, 1000, 4000, 10000,
      15000, 18000, 24000, 26000, 29000, 1000, 4000, 10000, 15000, 18000, 24000,
      26000, 29000, 1000, 4000, 10000, 15000, 18000, 24000, 26000,
    ],
  },
  {
    name: 'Demo (sales pipeline)',
    data: [
      1000, 4000, 10000, 15000, 18000, 24000, 26000, 29000, 1000, 4000, 10000,
      15000, 18000, 24000, 26000, 29000, 1000, 4000, 10000, 15000, 18000, 24000,
      26000, 29000, 1000, 4000, 10000, 15000, 18000, 24000, 26000,
    ],
  },
  {
    name: 'Negotiation (sales pipeline)',
    data: [
      1000, 4000, 10000, 15000, 18000, 24000, 26000, 29000, 1000, 4000, 10000,
      15000, 18000, 24000, 26000, 29000, 1000, 4000, 10000, 15000, 18000, 24000,
      26000, 29000, 1000, 4000, 10000, 15000, 18000, 24000, 26000,
    ],
  },
  {
    name: 'Won (sales pipeline)',
    data: [
      1000, 4000, 10000, 15000, 18000, 24000, 26000, 29000, 1000, 4000, 10000,
      15000, 18000, 24000, 26000, 29000, 1000, 4000, 10000, 15000, 18000, 24000,
      26000, 29000, 1000, 4000, 10000, 15000, 18000, 24000, 26000,
    ],
  },
  {
    name: 'Lost (sales pipeline)',
    data: [
      1000, 4000, 10000, 15000, 18000, 24000, 26000, 29000, 1000, 4000, 10000,
      15000, 18000, 24000, 26000, 29000, 1000, 4000, 10000, 15000, 18000, 24000,
      26000, 29000, 1000, 4000, 10000, 15000, 18000, 24000, 26000,
    ],
  },
];

export const overtimeOptionsBar: any = (theme: any) => {
  const colorsBar = [
    `${theme?.palette?.custom?.inc_grey}`,
    `${theme?.palette?.custom?.bright}`,
    `${theme?.palette?.success?.main}`,
    `${theme?.palette?.error?.main}`,
    `${theme?.palette?.custom?.turquoise_Blue}`,
    `${theme?.palette?.custom?.ext_dark_blue}`,
    `${theme?.palette?.custom?.light_lighter}`,
    `${theme?.palette?.custom?.graph_blue}`,
  ];
  return {
    chart: {
      type: 'bar',
      toolbar: {
        show: true,
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
    yaxis: {
      title: {
        text: 'Total revenue goal',
      },
    },
    xaxis: {
      categories: [
        '5/1/2023',
        '5/2/2023',
        '5/3/2023',
        '5/4/2023',
        '5/5/2023',
        '5/6/2023',
        '5/7/2023',
        '5/8/2023',
        '5/9/2023',
        '5/10/2023',
        '5/11/2023',
        '5/12/2023',
        '5/13/2023',
        '5/14/2023',
        '5/15/2023',
        '5/16/2023',
        '5/17/2023',
        '5/18/2023',
        '5/19/2023',
        '5/20/2023',
        '5/21/2023',
        '5/22/2023',
        '5/23/2023',
        '5/24/2023',
        '5/25/2023',
        '5/26/2023',
        '5/27/2023',
        '5/28/2023',
        '5/29/2023',
        '5/30/2023',
        '5/31/2023',
      ],
    },
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
    ],
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
