import { useGetTaskGraphDataQuery } from '@/services/airSales/task';
import { Theme, useTheme } from '@mui/material';

const useInsightCard = ({ startDate }: any) => {
  const theme = useTheme<Theme>();

  const { data: taskInsightsGraphData } = useGetTaskGraphDataQuery({
    params: {
      startDate: startDate,
    },
  });

  const transformedData =
    taskInsightsGraphData &&
    taskInsightsGraphData?.data?.map((item: any) => ({
      x: item?.date,
      y: item?.count,
    }));

  const chartOptions: any = {
    chart: {
      type: 'bar',
      height: 450,
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: function (value: any) {
          return new Date(value).toLocaleDateString();
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        barWidth: 20,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 0.3,
      colors: ['transparent'],
    },
    fill: {
      opacity: 0.8,
    },
  };

  return {
    chartOptions,
    transformedData,
    theme,
  };
};

export default useInsightCard;
