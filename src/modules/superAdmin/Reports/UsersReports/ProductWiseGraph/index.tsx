import dynamic from 'next/dynamic';
import { Box, Typography } from '@mui/material';
import { styles } from './ProductWiseGraph.style';
import { options, series } from './ProductWiseGraph.data';
import { useTheme } from '@mui/material/styles';
import useUserReports from '../useUserReports';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

const ProductWiseGrpah = (props: any) => {
  const { usersReportsGraphData } = props;
  const graphData = usersReportsGraphData?.data;
  const { isLoading } = useUserReports();

  const theme = useTheme();
  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });

  return (
    <Box sx={styles?.productWiseGraph}>
      <Typography
        sx={{
          color: `${theme?.palette?.custom?.dark_blue}`,
          fontWeight: 600,
          fontSize: '18px',
        }}
      >
        Product wise user stats
      </Typography>
      <Box height="350px">
        {isLoading ? (
          <SkeletonTable />
        ) : (
          <ReactApexChart
            options={options}
            series={series(graphData)}
            type="bar"
            height={350}
          />
        )}
      </Box>
    </Box>
  );
};

export default ProductWiseGrpah;
