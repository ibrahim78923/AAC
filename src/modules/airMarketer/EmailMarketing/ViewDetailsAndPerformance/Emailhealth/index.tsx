import { calculatePercentage } from '@/utils';
import { Box, Grid, LinearProgress, Typography, useTheme } from '@mui/material';

const Emailhealth = ({ data }: any) => {
  return (
    <>
      {data && (
        <Grid container>
          <Grid item sm={12}>
            <Typography variant="h6" sx={{ fontWeight: '700' }}>
              Email health
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <ProgressCustom
              title="Number of block email"
              value={calculatePercentage(data?.complaint, data?.total)}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};
export default Emailhealth;

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
