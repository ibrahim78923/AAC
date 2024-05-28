import { Theme, useTheme } from '@mui/material';

const useStatisticsCard = (data: any) => {
  const theme = useTheme<Theme>();

  const transformData = (data: any) => {
    const result: any = [];
    data?.forEach((item: any) => {
      item?.data?.forEach((product: any) => {
        result?.push({
          count: product?.count,
          product: product?.product,
          productType: item?.productType, // assuming the index is the month
        });
      });
    });
    return result;
  };
  const transformedData = transformData(data);

  const groupedData = transformedData?.reduce((acc: any, item: any) => {
    if (!acc[item?.productType]) {
      acc[item?.productType] = [];
    }
    acc[item?.productType]?.push(item?.count);
    return acc;
  }, {});

  const series: any = Object?.entries(groupedData ?? [])?.map(
    ([key, value]) => ({
      name: `${key?.charAt(0)?.toUpperCase()}${key?.slice(1)} Plan`,
      data: value,
    }),
  );

  const options: any = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30%',
        endingShape: 'rounded',
      },
    },

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
        'Air Operations',
        'Air Sales',
        'Air Marketer ',
        'Air Services',
        'Loyalty Program',
      ],
    },
    colors: [
      `${theme?.palette?.success?.main}`,
      `${theme?.palette?.warning?.main}`,
      `${theme?.palette?.error?.main}`,
      `${theme?.palette?.custom?.bright}`,
    ],
    legend: {
      horizontalAlign: 'center',
      itemMargin: {
        vertical: 16,
        horizontal: 49,
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
  return {
    series,
    options,
    theme,
  };
};

export default useStatisticsCard;
