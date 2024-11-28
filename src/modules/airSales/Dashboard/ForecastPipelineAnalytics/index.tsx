import { Box, Grid, Typography, useTheme } from '@mui/material';
import PipelineUsersGraph from './PipelineUsersGraph';
import PipelineTeamsGraph from './PipelineTeamsGraph';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { forecastPipelineStaticData } from './ForecastPipeline.data';

const ForecastPipelineAnalytics = (props: any) => {
  const { isStatic = true, pipelineForecastData, isLoading } = props;
  const theme = useTheme();
  const forecastUsersData = isStatic
    ? forecastPipelineStaticData
    : pipelineForecastData;
  const forecastTeamsData = isStatic
    ? forecastPipelineStaticData
    : pipelineForecastData;
  return (
    <Box
      sx={{
        border: `1px solid ${theme?.palette?.custom.off_white_three}`,
        padding: '2rem',
        borderRadius: '8px',
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ textAlign: 'center', pt: '1rem' }}>
          <Typography
            variant="h3"
            sx={{ color: `${theme?.palette?.slateBlue?.main}`, m: 0, p: 0 }}
          >
            Forecast Pipeline Analytics
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={isStatic ? 12 : 6}>
          {isLoading ? (
            <SkeletonTable />
          ) : (
            <PipelineUsersGraph pipelineForecastUsersData={forecastUsersData} />
          )}
        </Grid>
        <Grid item xs={12} md={12} lg={isStatic ? 12 : 6}>
          {isLoading ? (
            <SkeletonTable />
          ) : (
            <PipelineTeamsGraph pipelineForecastTeamsData={forecastTeamsData} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ForecastPipelineAnalytics;
