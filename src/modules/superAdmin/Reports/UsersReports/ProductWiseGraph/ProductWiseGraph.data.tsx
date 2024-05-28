import { dealStatus } from '@/constants';

export const series = (graphData: any) => {
  const transformData = (data: any[]) => {
    const groupedData = data?.reduce((acc: any, item: any) => {
      if (!acc[item?.product]) {
        acc[item?.product] = Array(5)?.fill(dealStatus?.INITIAL_NUMBER);
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

export const options: any = {
  chart: {
    type: 'bar',
    height: 350,
  },
  colors: ['#47B263', '#FFC20E', '#FF4A4A', '#0AADC7', '#626E8E'],
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
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
