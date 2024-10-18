function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math?.floor(Math?.random() * 16)];
  }
  return color;
}

export const totalSeriesBar = (pipelineForecastData: any) => {
  const seriesData: any = [];

  pipelineForecastData?.forecastWithPipeline?.forEach((pipeline: any) => {
    const pipelineSeries = {
      name: pipeline?.name + ` (${pipeline?.pipelinesDetails?.name})`,
      data: pipelineForecastData?.graph?.map((entry: any) => {
        const category = entry?.categories?.find(
          (cat: any) => cat?._id === pipeline?._id,
        );
        return category ? category?.totalAmount : 0;
      }),
    };
    seriesData?.push(pipelineSeries);
  });

  return seriesData;
};

export const totalOptionsBar: any = (theme: any, pipelineForecastData: any) => {
  const numberOfStages =
    pipelineForecastData?.graph[0]?.forecastCategories?.length || 0;

  const predefinedColors = [
    `${theme?.palette?.custom?.graph_blue}`,
    `${theme?.palette?.custom?.light_lighter}`,
    `${theme?.palette?.custom?.ext_dark_blue}`,
    `${theme?.palette?.custom?.turquoise_Blue}`,
    `${theme?.palette?.error?.main}`,
    `${theme?.palette?.success?.main}`,
    `${theme?.palette?.custom?.bright}`,
  ];

  const colorsBar = Array?.from(
    { length: numberOfStages },
    (_, i) => predefinedColors[i] || getRandomColor(),
  );

  const categories = pipelineForecastData?.graph?.map(
    (collaborator: any) =>
      collaborator?.collaboratorDetails[0]?.name || 'Unknown',
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
        horizontal: true,
        columnWidth: '60%',
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
      categories: categories,
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

export const comparisonSeriesBar: any = (pipelineForecastData: any) => {
  const seriesData: any = [];

  pipelineForecastData?.forecastWithPipeline?.forEach((pipeline: any) => {
    const pipelineSeries = {
      name: pipeline?.name + ` (${pipeline?.pipelinesDetails?.name})`,
      data: pipelineForecastData?.graph?.map((entry: any) => {
        const category = entry?.categories?.find(
          (cat: any) => cat?._id === pipeline?._id,
        );
        return category ? category?.totalAmount : 0;
      }),
    };
    seriesData?.push(pipelineSeries);
  });

  return seriesData;
};

export const comparisonOptionsBar: any = (
  theme: any,
  pipelineForecastData: any,
) => {
  const categories = pipelineForecastData?.graph?.map(
    (monthData: any) => monthData?.date?.split(' ')[0],
  );

  const numberOfStages =
    pipelineForecastData?.graph[0]?.forecastCategories?.length || 0;

  const predefinedColors = [
    `${theme?.palette?.custom?.graph_blue}`,
    `${theme?.palette?.custom?.light_lighter}`,
    `${theme?.palette?.custom?.ext_dark_blue}`,
    `${theme?.palette?.custom?.turquoise_Blue}`,
    `${theme?.palette?.error?.main}`,
    `${theme?.palette?.success?.main}`,
    `${theme?.palette?.custom?.bright}`,
  ];

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
      categories: categories,
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
  const seriesData: any = [];

  pipelineForecastData?.forecastWithPipeline?.forEach((pipeline: any) => {
    const pipelineSeries = {
      name: pipeline?.name + ` (${pipeline?.pipelinesDetails?.name})`,
      data: pipelineForecastData?.graph?.map((entry: any) => {
        const category = entry?.categories?.find(
          (cat: any) => cat?._id === pipeline?._id,
        );
        return category ? category?.totalAmount : 0;
      }),
    };
    seriesData?.push(pipelineSeries);
  });

  return seriesData;
};

export const overtimeOptionsBar = (theme: any, pipelineForecastData: any) => {
  const numberOfStages =
    pipelineForecastData?.graph[0]?.forecastCategories?.length || 0;

  const predefinedColors = [
    `${theme?.palette?.custom?.graph_blue}`,
    `${theme?.palette?.custom?.light_lighter}`,
    `${theme?.palette?.custom?.ext_dark_blue}`,
    `${theme?.palette?.custom?.turquoise_Blue}`,
    `${theme?.palette?.error?.main}`,
    `${theme?.palette?.success?.main}`,
    `${theme?.palette?.custom?.bright}`,
  ];

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
      categories: pipelineForecastData?.graph?.map((entry: any) => entry?.date),
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
