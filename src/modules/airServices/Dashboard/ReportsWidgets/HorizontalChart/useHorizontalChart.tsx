import { useTheme } from '@mui/material';
import { ITEMS_DATA_TYPE } from '../ReportsWidgets.data';
import { MONTH_NAMES } from '@/constants/strings';

export const useHorizontalChart = (props: any) => {
  const { data, barChart } = props;

  const theme = useTheme();

  const dataItems =
    barChart?.xAxis?.fieldType === ITEMS_DATA_TYPE?.OBJECT_ID
      ? data?.items?.map((item: any) => item?.value)
      : data?.items;

  const initializeAccumulator = dataItems?.reduce(
    (statusAcc: any, item: any) => {
      statusAcc[item] = 0;
      return statusAcc;
    },
    {},
  );

  const groupedData = data?.counts?.reduce((acc: any, curr: any) => {
    const { month, value, count } = curr;
    acc[month] = acc?.[month] || initializeAccumulator;
    acc[month][value] = count;
    return acc;
  }, {});

  const months = Object?.keys(groupedData || {})?.sort(
    (a: any, b: any) => a - b,
  );

  const seriesData = dataItems?.map((status: any) => ({
    name: status,
    data: months?.map((month) => groupedData[month]?.[status] || 0),
  }));

  const options = {
    xaxis: {
      categories: months?.map((month) => MONTH_NAMES?.[parseInt(month) - 1]),
    },
    colors: [
      theme?.palette?.custom?.bright,
      theme?.palette?.error?.main,
      theme?.palette?.warning?.main,
      theme?.palette?.success?.main,
    ],
    plotOptions: {
      bar: {
        columnWidth: '30%',
        borderRadius: 2,
      },
    },
    legend: {
      offsetY: 5,
    },
  };

  return { options, seriesData };
};
