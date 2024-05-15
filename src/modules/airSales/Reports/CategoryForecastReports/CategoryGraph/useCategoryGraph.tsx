import { useTheme } from '@mui/material';
import useCateogoryForcastReports from '@/modules/airSales/Reports/CategoryForecastReports/useCategoryForcastReports';
import {
  comparisonOptionsBar,
  comparisonSeriesBar,
  overtimeOptionsBar,
  overtimeSeriesBar,
  totalOptionsBar,
  totalSeriesBar,
} from './CategoryGraph.data';
import { generateRandomNumbers } from '@/utils/avatarUtils';

const useCategoryGraph = () => {
  const { activeCardObj } = useCateogoryForcastReports();
  const theme = useTheme();

  const cardTitle = (val: any) => {
    switch (val) {
      case activeCardObj?.OVERTIME:
        return 'Over time';
      case activeCardObj?.COMPARISON:
        return 'Comparison';
      default:
        return 'Forecast Analytics';
    }
  };

  const cardWiseOptions = (type: any) => {
    switch (type) {
      case activeCardObj?.OVERTIME:
        return overtimeOptionsBar(theme);
      case activeCardObj?.COMPARISON:
        return comparisonOptionsBar(theme);
      default:
        return totalOptionsBar(theme);
    }
  };

  const cardWiseSeries = (type: any) => {
    switch (type) {
      case activeCardObj?.OVERTIME:
        return overtimeSeriesBar;
      case activeCardObj?.COMPARISON:
        return comparisonSeriesBar;
      default:
        return totalSeriesBar(generateRandomNumbers);
    }
  };

  return {
    cardTitle,
    cardWiseOptions,
    cardWiseSeries,
  };
};

export default useCategoryGraph;
