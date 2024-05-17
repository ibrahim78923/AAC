import { dealStatus } from '@/constants';

export const series = (dealsInPercentage: any) => {
  const openDealsPercentage = dealsInPercentage?.map(
    (item: any) => item?.openDealsPercentage,
  );
  const wonDealsPercentage = dealsInPercentage?.map(
    (item: any) => item?.wonDealsPercentage,
  );
  const lostDealsPercentage = dealsInPercentage?.map(
    (item: any) => item?.lostDealsPercentage,
  );

  return [
    lostDealsPercentage[dealStatus?.INITIAL_NUMBER],
    wonDealsPercentage[dealStatus?.INITIAL_NUMBER],
    openDealsPercentage[dealStatus?.INITIAL_NUMBER],
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
  const totalDeals = dealsGraphData?.map((item: any) => item?.totalDeals);
  const openDeals = dealsGraphData?.map((item: any) => item?.totalOpenDeals);
  const closeDeals = dealsGraphData?.map((item: any) => item?.totalCloseDeals);
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
