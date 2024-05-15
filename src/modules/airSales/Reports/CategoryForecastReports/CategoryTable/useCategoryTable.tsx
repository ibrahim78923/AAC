import { useTheme } from '@mui/material';
import usePipelineForcastReports from '../useCategoryForcastReports';
import {
  comparisonColumns,
  overtimeColumns,
  totalColumns,
} from './CategoryTable.data';

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

  const activeTable = (activeCard: any) => {
    switch (activeCard) {
      case 'comparison':
        return comparisonColumns(theme?.palette);
      case 'overtime':
        return overtimeColumns(theme?.palette);
      default:
        return totalColumns(theme?.palette);
    }
  };

  return {
    cardTableHeader,
    activeTable,
  };
};

export default usePipelineOverview;
