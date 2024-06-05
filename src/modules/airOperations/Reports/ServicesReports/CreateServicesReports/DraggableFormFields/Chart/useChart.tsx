import { CHARTS } from '@/constants/strings';
import { useTheme } from '@mui/material';
import { useEffect } from 'react';
import { BarChart } from './BarChart';
import { DonutChart } from './DonutChart';
import { PieChart } from './PieChart';

export const useChart = (props: any) => {
  const {
    setChartComponent,
    chartType,
    yAxesData,
    xAxesData,
    chartMetricType,
  } = props;
  const theme = useTheme();

  useEffect(() => {
    if (chartType === CHARTS?.BAR_CHART) {
      setChartComponent(<BarChart />);
    } else if (chartType === CHARTS?.DONUT_CHART) {
      setChartComponent(<DonutChart />);
    } else if (chartType === CHARTS?.PIE_CHART) {
      setChartComponent(<PieChart />);
    } else {
      setChartComponent(null);
    }
  }, [chartType, setChartComponent, yAxesData, xAxesData, chartMetricType]);

  return {
    theme,
  };
};
