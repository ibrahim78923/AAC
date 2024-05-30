import { CHARTS } from '@/constants/strings';
import { useTheme } from '@mui/material';
import { useState } from 'react';

export const useChart = (props: any) => {
  const { setChartComponent } = props;
  const theme = useTheme();
  const [chartType, setChartType] = useState(CHARTS?.BAR_CHART);
  const [isIconBoxVisible, setIsIconBoxVisible] = useState(false);

  const toggleIconBox = () => {
    setIsIconBoxVisible(!isIconBoxVisible);
  };

  const handleChartSelection = (
    component: JSX.Element,
    type: any,
    chartName: any,
  ) => {
    setChartComponent({ component, chartName });
    setChartType(type);
  };
  return {
    theme,
    setChartType,
    chartType,
    toggleIconBox,
    isIconBoxVisible,
    handleChartSelection,
  };
};
