import TanstackTable from '@/components/Table/TanstackTable';
import { performanceColumns, performanceData } from './PerformanceTable.data';
import { Box, useTheme } from '@mui/material';
import TableHeader from './TableHeader/TableHeader';

const PerformanceTable = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        border: `1px solid ${theme?.palette?.grey[700]}`,
        borderRadius: '8px',
        padding: '20px',
      }}
    >
      <TableHeader />
      <TanstackTable columns={performanceColumns} data={performanceData} />
    </Box>
  );
};

export default PerformanceTable;
