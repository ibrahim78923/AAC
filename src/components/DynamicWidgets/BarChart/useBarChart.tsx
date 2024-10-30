import { useTheme } from '@mui/material';
import { ARRAY_INDEX, FIELD_TYPE, MONTH_NAMES } from '@/constants/strings';

export const useBarChart = (props: any) => {
  const { data = { counts: [], items: [] }, barChart, title } = props;
  const theme = useTheme();

  const { items = [], counts = [] } =
    data?.[title]?.[ARRAY_INDEX?.ZERO] ?? data ?? {};

  const dataItems =
    barChart?.xAxis?.fieldType === FIELD_TYPE?.OBJECT_ID
      ? items
          ?.filter((item: any) => !!item?.value)
          ?.map((item: any) => item?.value)
      : items;
  const groupedData = counts?.reduce((acc: any, curr: any) => {
    const { month, value, count } = curr;
    if (!month) return;
    acc[month] = acc?.[month] ?? {};
    acc[month][value] = count;
    return acc;
  }, {});

  const months = Object?.keys(groupedData || {})?.sort(
    (a: any, b: any) => a - b,
  );

  const seriesData = dataItems?.map((status: any) => ({
    name: status,
    data: months?.map((month) => groupedData?.[month]?.[status] || 0),
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
