import { MONTH_NAMES } from '@/constants/strings';

export const series = (dealsInPercentage: any) => {
  const openDealsPercentage = dealsInPercentage
    ?.map((item: any) => item?.openDealsPercentage)
    ?.join(', ');

  const wonDealsPercentage = dealsInPercentage
    ?.map((item: any) => item?.wonDealsPercentage)
    ?.join(', ');

  const lostDealsPercentage = dealsInPercentage
    ?.map((item: any) => item?.lostDealsPercentage)
    ?.join(', ');

  return [
    Number(lostDealsPercentage),
    Number(wonDealsPercentage),
    Number(openDealsPercentage),
  ];
};

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

export const seriesBar = (dealsGraphData: any) => {
  const allMonths = [
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
  ];

  const totalDeals = allMonths?.map((month) => {
    const deal = dealsGraphData?.find(
      (item: any) =>
        item?.month?.trim()?.toLowerCase() === month?.toLowerCase(),
    );
    return deal ? deal?.totalDeals : 0;
  });

  const openDeals = allMonths?.map((month) => {
    const deal = dealsGraphData?.find(
      (item: any) =>
        item?.month?.trim()?.toLowerCase() === month?.toLowerCase(),
    );
    return deal ? deal?.totalOpenDeals : 0;
  });

  const closeDeals = allMonths?.map((month) => {
    const deal = dealsGraphData?.find(
      (item: any) =>
        item?.month?.trim()?.toLowerCase() === month?.toLowerCase(),
    );
    return deal ? deal?.totalCloseDeals : 0;
  });

  return [
    {
      name: 'All Deals',
      data: totalDeals,
    },
    {
      name: 'Open Deals',
      data: openDeals,
    },
    {
      name: 'CloseDeals',
      data: closeDeals,
    },
  ];
};
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
      categories: MONTH_NAMES,
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

export const dealsReportsGraphData = [
  {
    totalDeals: 15,
    totalOpenDeals: 8,
    totalCloseDeals: 4,
    month: 'JUN',
  },
  {
    totalDeals: 5,
    totalOpenDeals: 14,
    totalCloseDeals: 7,
    month: 'MAY',
  },
  {
    totalDeals: 14,
    totalOpenDeals: 5,
    totalCloseDeals: 2,
    month: 'AUG',
  },
  {
    totalDeals: 13,
    totalOpenDeals: 7,
    totalCloseDeals: 7,
    month: 'OCT',
  },
  {
    totalDeals: 17,
    totalOpenDeals: 8,
    totalCloseDeals: 3,
    month: 'JUL',
  },
];

export const dealsReportsCardsData = [
  {
    _id: null,
    totalDeals: 59,
    totalWonDeals: 22,
    totalLostDeals: 13,
    totalOpenDeals: 24,
    totalCloseDeals: 35,
    wonDealsPercentage: 40.29,
    lostDealsPercentage: 12.03,
    openDealsPercentage: 67.68,
  },
];
