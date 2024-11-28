import { indexNumbers } from '@/constants';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math?.floor(Math?.random() * 16)];
  }
  return color;
}

export const totalSeriesBar = (categoryForecastData: any) => {
  return categoryForecastData?.forecastCategories?.flatMap(
    (pipeline: any) =>
      pipeline?.stages?.map((stage: any) => {
        const graphData = categoryForecastData?.teamStats?.find(
          (g: any) =>
            g?.forecastCategories?.some(
              (sg: any) => sg?.stageId === stage?._id,
            ),
        );

        const totalAmount =
          graphData?.forecastCategories?.find(
            (sg: any) => sg?.stageId === stage?._id,
          )?.totalAmount || indexNumbers?.ZERO;

        return {
          name: `${stage?.name} (${pipeline?.name})`,
          data: [totalAmount],
        };
      }),
  );
};

export const totalOptionsBar: any = (theme: any, pipelineForecastData: any) => {
  const collaboratorNames =
    pipelineForecastData?.teamStats?.map(
      (item: any) =>
        item?.collaboratorDetails[indexNumbers?.ZERO]?.name || 'Unknown',
    ) || [];

  const numberOfStages =
    pipelineForecastData?.teamStats[indexNumbers?.ZERO]?.stageGroups?.length ||
    indexNumbers?.ZERO;

  const predefinedColors = [
    `${theme?.palette?.custom?.graph_blue}`,
    `${theme?.palette?.custom?.light_lighter}`,
    `${theme?.palette?.custom?.ext_dark_blue}`,
    `${theme?.palette?.custom?.turquoise_Blue}`,
    `${theme?.palette?.error?.main}`,
    `${theme?.palette?.success?.main}`,
    `${theme?.palette?.custom?.bright}`,
  ];

  // If stages exceed predefined colors, generate random colors dynamically
  const colorsBar = Array?.from(
    { length: numberOfStages },
    (_, i) => predefinedColors[i] || getRandomColor(),
  );

  return {
    chart: {
      type: 'bar',
      toolbar: {
        show: true,
      },
    },
    padding: {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: '80%',
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
      categories: collaboratorNames,
      title: {
        text: 'Total revenue goal',
      },
      labels: {
        formatter: function (val: any) {
          return `£ ${val.toFixed(indexNumbers?.ONE)}`; // Format labels with currency and thousands
        },
      },
    },
    yaxis: {
      title: {
        text: 'Deal owner',
      },
    },
    grid: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
      },
      row: {
        padding: {
          top: 50, // Adjust this to increase the margin between rows
          bottom: 50,
        },
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
