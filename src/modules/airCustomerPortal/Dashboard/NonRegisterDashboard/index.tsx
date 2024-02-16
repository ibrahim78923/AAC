import { Box, Grid, Typography } from '@mui/material';
import { useNonRegisterDashboard } from './useNonRegisterDashboard';
import { Header } from './Header';
import { PopularArticles } from './PopularArticles';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

const NonRegisterDashboard = () => {
  const { articlesData, handleViewMore, isLoading, theme } =
    useNonRegisterDashboard();
  return (
    <Box
      p={2}
      borderRadius={2}
      sx={{ backgroundColor: theme?.palette?.grey[100] }}
    >
      <Header />
      <Typography mt={2} p={1.5} sx={{ backgroundColor: 'white' }} variant="h6">
        Popular Articles
      </Typography>
      <Grid container borderRadius={2} sx={{ backgroundColor: 'white' }}>
        <Grid item xs={12}>
          {isLoading ? (
            <SkeletonTable />
          ) : (
            <PopularArticles
              articlesData={articlesData}
              handleViewMore={handleViewMore}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default NonRegisterDashboard;
