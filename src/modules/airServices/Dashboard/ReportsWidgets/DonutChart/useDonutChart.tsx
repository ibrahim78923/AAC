import { ITEMS_DATA_TYPE } from '../ReportsWidgets.data';

export const useDonutChart = (props: any) => {
  const { data = { counts: [], items: [] }, donutChart } = props;

  const { items = [], counts = [] } = data;

  const dataItems =
    donutChart?.fieldType === ITEMS_DATA_TYPE?.OBJECT_ID
      ? items
          ?.filter((item: any) => !!item?.value)
          ?.map((item: any) => item?.value)
      : items;

  const groupByValue = counts?.reduce((acc: any, item: any) => {
    if (acc[item?.value]) {
      acc[item?.value]!.count += item?.count;
    } else {
      acc[item?.value] = { ...item };
    }
    return acc;
  }, {});

  const uniqueCounts = Object?.values(groupByValue ?? {});

  const seriesData = uniqueCounts
    ?.filter((item: any) => item?.value)
    ?.map((item: any) => item?.count);

  return {
    uniqueCounts,
    dataItems,
    seriesData,
  };
};
