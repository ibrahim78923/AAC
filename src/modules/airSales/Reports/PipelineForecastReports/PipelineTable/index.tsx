import { Box, Theme, Typography, useTheme } from '@mui/material';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { pipelineTableData } from './PipelineTable.data';
import { styles } from './PipelineTable.style';
import usePipelineOverview from './usePipelineTable';
import usePipelineForcastReports from '../usePipelineForcastReports';

const PipelineOverview = ({ activeCard }: any) => {
  const theme = useTheme<Theme>();
  const { activeTable, cardTableHeader } = usePipelineOverview();
  const { activeCardObj } = usePipelineForcastReports();

  return (
    <>
      <Box sx={styles.dealBox(theme)}>
        <Box>
          <Typography
            variant="h5"
            sx={{ color: `${theme?.palette?.grey[800]}` }}
          >
            {cardTableHeader(activeCard)}
          </Typography>
          {activeCard !== activeCardObj?.TOTAL && (
            <Typography
              variant="body3"
              sx={{
                color: `${theme?.palette?.custom?.main}`,
                mb: { xs: '10px' },
              }}
            >
              {activeCard === activeCardObj?.OVERTIME
                ? 'Date range: This entire month'
                : 'Date range: 2023'}
            </Typography>
          )}
        </Box>

        {activeCard === activeCardObj?.TOTAL && <Search label="Search here" />}
      </Box>
      <TanstackTable
        columns={activeTable(activeCard)}
        data={pipelineTableData}
        isPagination
        totalRecords={5}
      />
    </>
  );
};

export default PipelineOverview;
