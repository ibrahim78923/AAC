import { useTheme } from '@mui/material';
import usePipelineForcastReports from '@/modules/airSales/Reports/PipelineForecastReports/usePipelineForcastReports';
import {
  comparisonOptionsBar,
  comparisonSeriesBar,
  overtimeOptionsBar,
  overtimeSeriesBar,
  totalOptionsBar,
  totalSeriesBar,
} from './PipelineGraph.data';

const usePipelineGraph = () => {
  const { activeCardObj } = usePipelineForcastReports();
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

  const cardWiseOptions = (type: any, pipelineForecastData: any) => {
    switch (type) {
      case activeCardObj?.OVERTIME:
        return overtimeOptionsBar(theme, pipelineForecastData);
      case activeCardObj?.COMPARISON:
        return comparisonOptionsBar(theme, pipelineForecastData);
      default:
        return totalOptionsBar(theme, pipelineForecastData);
    }
  };

  const cardWiseSeries = (type: any, pipelineForecastData: any) => {
    switch (type) {
      case activeCardObj?.OVERTIME:
        return overtimeSeriesBar(pipelineForecastData);
      case activeCardObj?.COMPARISON:
        return comparisonSeriesBar(pipelineForecastData);
      default:
        return totalSeriesBar(pipelineForecastData);
    }
  };

  return {
    cardTitle,
    cardWiseOptions,
    cardWiseSeries,
  };
};

export default usePipelineGraph;
