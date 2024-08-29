import { useTheme } from '@mui/material';
import {
  standardMonthAbbreviations,
  statuses,
  statusNames,
} from '../TicketsReport.data';

export const useTicketsReportChart = ({ chartData }: any) => {
  const theme = useTheme();

  const monthLabelsFromBackend = chartData?.monthLabels || [];

  const monthIndexMap = monthLabelsFromBackend.reduce(
    (acc: any, label: string, index: number) => {
      acc[label.toUpperCase()] = index;
      return acc;
    },
    {},
  );

  const reorderedData = statuses.map((statusKey) => {
    return standardMonthAbbreviations.map((month) => {
      const backendIndex = monthIndexMap[month];
      return backendIndex !== undefined
        ? chartData[statusKey][backendIndex]
        : 0;
    });
  });

  const seriesData = statusNames.map((name, index) => ({
    name,
    data: reorderedData[index],
  }));

  const options = {
    xaxis: {
      categories: standardMonthAbbreviations,
    },
    colors: [
      theme?.palette?.primary?.main,
      theme?.palette?.blue?.link_blue,
      theme?.palette?.error?.main,
      theme?.palette?.warning?.main,
      theme?.palette?.custom?.lime_green,
      theme?.palette?.info?.dark,
    ],
    plotOptions: {
      bar: {
        columnWidth: '60%',
      },
    },
    legend: {
      offsetY: 5,
    },
  };

  return { options, seriesData };
};
