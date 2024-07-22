import { dealStatus } from '@/constants';
import { MONTH_NAMES } from '@/constants/strings';
import { Theme } from '@mui/material';

export const series = (graphData: any) => {
  const transformData = (data: any[]) => {
    const uniqueMonths = Array?.from(
      new Set(data?.map((item) => item?.month)),
    )?.sort((a, b) => a - b);
    const groupedData = data?.reduce((acc: any, item: any) => {
      if (!acc[item?.product]) {
        acc[item?.product] = Array(uniqueMonths?.length)?.fill(
          dealStatus?.INITIAL_NUMBER,
        );
      }
      const monthIndex = uniqueMonths?.indexOf(item?.month);
      acc[item?.product][monthIndex] = item?.count;
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

export const options: any = (theme: Theme, usersReportsGraphData: any[]) => {
  const transformedData = usersReportsGraphData?.map((item: any) => ({
    month: MONTH_NAMES[item?.month - 1],
  }));

  const monthNamesArray: string[] = transformedData?.map((item) => item?.month);
  const uniqueMonthNames: string[] = Array?.from(new Set(monthNamesArray));
  const sortMonthNames: string[] = uniqueMonthNames?.sort(
    (a, b) => MONTH_NAMES?.indexOf(a) - MONTH_NAMES?.indexOf(b),
  );

  return {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    colors: [
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.error.main,
      theme.palette.custom.bright,
      theme.palette.custom.dark_grey_bright,
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
      categories: sortMonthNames,
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
