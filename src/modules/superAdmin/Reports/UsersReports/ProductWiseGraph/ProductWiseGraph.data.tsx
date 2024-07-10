import { dealStatus } from '@/constants';
import { MONTH_NAMES } from '@/constants/strings';
import { Theme } from '@mui/material';

export const series = (graphData: any) => {
  const transformData = (data: any[]) => {
    const groupedData = data?.reduce((acc: any, item: any) => {
      if (!acc[item?.product]) {
        acc[item?.product] = Array(12)?.fill(dealStatus?.INITIAL_NUMBER);
      }
      acc[item?.product][item.month - 1] = item?.count;
      return acc;
    }, {});
    const transformedData = Object?.entries(groupedData ?? [])?.map(
      ([name, data]) => ({ name, data }),
    );
    return transformedData;
  };

  return transformData(graphData)?.map((item: any) => ({
    name: item?.name,
    data: item?.data,
  }));
};

export const options: any = (theme: Theme) => ({
  chart: {
    type: 'bar',
    height: 350,
  },
  colors: [
    theme?.palette?.success?.main,
    theme?.palette?.warning?.main,
    theme?.palette?.error?.main,
    theme?.palette?.custom?.bright,
    theme?.palette?.custom?.dark_grey_bright,
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '12px',
      endingShape: 'rounded',
    },
  },

  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 5,
    colors: ['transparent'],
  },

  xaxis: {
    categories: MONTH_NAMES,
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
});
