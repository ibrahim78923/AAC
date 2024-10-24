import { useTheme } from '@mui/material';
import usePipelineForcastReports from '../usePipelineForcastReports';
import {
  comparisonColumns,
  overtimeColumns,
  totalColumns,
} from './PipelineTable.data';

const usePipelineOverview = () => {
  const { activeCardObj } = usePipelineForcastReports();
  const theme = useTheme();
  const cardTableHeader = (val: any) => {
    switch (val) {
      case activeCardObj?.OVERTIME:
        return 'Deal Stage';
      case activeCardObj?.COMPARISON:
        return 'Deal Stage';
      default:
        return 'Overview';
    }
  };

  const activeTable = (activeCard: any, data: any) => {
    switch (activeCard) {
      case 'comparison':
        return comparisonColumns(theme?.palette, data);
      case 'overtime':
        return overtimeColumns(theme?.palette, data);
      default:
        return totalColumns(theme?.palette, data);
    }
  };

  return {
    cardTableHeader,
    activeTable,
  };
};

export default usePipelineOverview;
