import { calculatePercentage } from '@/utils';
import { Box, Grid, LinearProgress, Typography, useTheme } from '@mui/material';

const ClickPerformance = ({ data }: any) => {
  return (
    <>
      {data && (
        <Grid container>
          <Grid item sm={12}>
            <Typography variant="h6" sx={{ fontWeight: '700' }}>
              Click Performance
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <ProgressCustom
              title="Open rate"
              value={calculatePercentage(data.open, data.total)}
            />
          </Grid>
          <Grid item sm={6}>
            <ProgressCustom
              title="Number of links clicked"
              value={calculatePercentage(data.click, data.total)}
            />
          </Grid>
          <Grid item sm={6}>
            <ProgressCustom
              title="Click rate"
              value={calculatePercentage(data.click, data.total)}
            />
          </Grid>
          <Grid item sm={6}>
            <ProgressCustom
              title="Click -through rate"
              value={calculatePercentage(data.click, data.total)}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};
export default ClickPerformance;

const ProgressCustom = ({ title, value }: any) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        mb: 1,
        gap: '10px',
      }}
    >
      <Typography variant="body2" fontWeight={500}>
        {title}
      </Typography>
      <Box width={'139px'}>
        <LinearProgress
          variant="determinate"
          value={value}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: theme?.palette?.grey[400],
            '& .MuiLinearProgress-bar': {
              backgroundColor: theme?.palette?.primary?.main,
            },
          }}
        />
      </Box>
    </Box>
  );
};
