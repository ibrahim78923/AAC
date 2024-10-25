import { Box, Grid, Typography, useTheme } from '@mui/material';

const ForecastCategoryAnalytics = (props: any) => {
  const { isStatic = false } = props;
  const theme = useTheme();
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
            Forecast Category Report
          </Typography>
        </Grid>
        <Grid item xs={12} md={isStatic ? 12 : 6}>
          forecast category graph here
        </Grid>
        <Grid item xs={12} md={isStatic ? 12 : 6}>
          forecast category table here
        </Grid>
      </Grid>
    </Box>
  );
};

export default ForecastCategoryAnalytics;
