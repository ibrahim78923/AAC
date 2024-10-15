// Helper to generate random colors
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math?.floor(Math?.random() * 16)];
  }
  return color;
}

export const totalSeriesBar = (pipelineForecastData: any) => {
  return pipelineForecastData?.pipelineWithStages?.flatMap(
    (pipeline: any) =>
      pipeline?.stages?.map((stage: any) => {
        const graphData = pipelineForecastData?.graph?.find(
          (g) => g?.stageGroups?.some((sg: any) => sg?.stageId === stage?._id),
        );

        const totalAmount =
          graphData?.stageGroups?.find((sg: any) => sg?.stageId === stage?._id)
            ?.totalAmount || 0;

        return {
          name: `${stage?.name} (${pipeline?.name})`,
          data: [totalAmount],
        };
      }),
  );
};

export const totalOptionsBar: any = (theme: any, pipelineForecastData: any) => {
  const collaboratorNames = pipelineForecastData?.graph?.map(
    (item: any) => item?.collaboratorDetails[0]?.name || 'Unknown',
  );

  const numberOfStages =
    pipelineForecastData?.graph[0]?.stageGroups?.length || 0;

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
          return `£ ${val.toFixed(1)}`; // Format labels with currency and thousands
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

export const comparisonSeriesBar = (pipelineForecastData: any) => {
  const series: any = [];

  // Extract pipelines and their stages
  const pipelines = pipelineForecastData?.pipelineWithStages || [];
  const graphData = pipelineForecastData?.graph || [];

  pipelines?.forEach((pipeline: any) => {
    pipeline?.stages?.forEach((stage: any) => {
      const stageName = `${stage?.name} (${pipeline?.name})`;
      const data = graphData?.map((monthData: any) => {
        const stageData = monthData?.stages?.find(
          (s: any) => s?.stageId === stage?._id,
        );
        return stageData ? stageData?.total : 0;
      });
      series?.push({
        name: stageName,
        data,
      });
    });
  });

  return series;
};

export const comparisonOptionsBar = (theme: any, pipelineForecastData: any) => {
  const colorsBar = pipelineForecastData?.graph?.map(() => getRandomColor());

  const months = pipelineForecastData?.graph?.map(
    (data: any) => data?.date?.split(' ')[0],
  );
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
    yaxis: {
      title: {
        text: 'Total revenue goal',
      },
    },
    xaxis: {
      categories: months || [
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

export const overtimeSeriesBar = (pipelineForecastData: any) => {
  const series: any = [];

  // Extract pipelines and their stages
  const pipelines = pipelineForecastData?.pipelineWithStages || [];
  const graphData = pipelineForecastData?.graph || [];

  pipelines?.forEach((pipeline: any) => {
    pipeline?.stages?.forEach((stage: any) => {
      const stageName = `${stage?.name} (${pipeline?.name})`;
      const data = graphData?.map((monthData: any) => {
        const stageData = monthData?.stages?.find(
          (s: any) => s?.stageId === stage?._id,
        );
        return stageData ? stageData?.total : 0;
      });
      series?.push({
        name: stageName,
        data,
      });
    });
  });

  return series;
};

export const overtimeOptionsBar = (theme: any, pipelineForecastData: any) => {
  const colorsBar = pipelineForecastData?.graph?.map(() => getRandomColor());

  const months = pipelineForecastData?.graph?.map(
    (data: any) => data?.date?.split(' ')[0],
  );
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
    yaxis: {
      title: {
        text: 'Total revenue goal',
      },
    },
    xaxis: {
      categories: months || [
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
