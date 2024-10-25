import { Box, Grid, Typography, useTheme } from '@mui/material';
import CategoryUsersGraph from './CategoryUsersGraph';
import CategoryTeamsGraph from './CategoryTeamsGraph';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { forecastCategoryStaticData } from './ForecastCategory.data';

const ForecastCategoryAnalytics = (props: any) => {
  const { isStatic = true, categoryForecastData, isLoading } = props;
  const theme = useTheme();
  const forecastCategoryUsersData = isStatic
    ? forecastCategoryStaticData
    : categoryForecastData;
  const forecastCategoryTeamsData = isStatic
    ? forecastCategoryStaticData
    : categoryForecastData;
  return (
    <Box
      sx={{
        border: `1px solid ${theme?.palette?.custom.off_white_three}`,
        padding: '2rem',
        borderRadius: '8px',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ textAlign: 'center', paddingY: '1rem' }}>
          <Typography
            variant="h3"
            sx={{ color: `${theme?.palette?.slateBlue?.main}` }}
          >
            Forecast Category Analytics
          </Typography>
        </Grid>
        <Grid item xs={12} md={isStatic ? 12 : 6}>
          {isLoading ? (
            <SkeletonTable />
          ) : (
            <CategoryUsersGraph categoryUsersData={forecastCategoryUsersData} />
          )}
        </Grid>
        <Grid item xs={12} md={isStatic ? 12 : 6}>
          {isLoading ? (
            <SkeletonTable />
          ) : (
            <CategoryTeamsGraph categoryTeamsData={forecastCategoryTeamsData} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ForecastCategoryAnalytics;
