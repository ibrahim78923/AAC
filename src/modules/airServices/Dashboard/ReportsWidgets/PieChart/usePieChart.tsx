import { ITEMS_DATA_TYPE } from '../ReportsWidgets.data';

export const usePieChart = (props: any) => {
  const { data = { counts: [], items: [] }, pieChart } = props;
  const { items = [], counts = [] } = data;

  const dataItems =
    pieChart?.fieldType === ITEMS_DATA_TYPE?.OBJECT_ID
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

  return {
    uniqueCounts,
    dataItems,
  };
};
