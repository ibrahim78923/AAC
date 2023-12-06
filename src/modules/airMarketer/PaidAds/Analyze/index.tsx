import { Box, Card, Divider, Grid, Typography } from '@mui/material';
import { manageAccountData, manageStatusData } from '../Manage/Manage.data';
import AnalyzeCharts from './AnalyzeCharts';
import { v4 as uuidv4 } from 'uuid';
import useAnalyze from './useAnalyze';

const Analyze = () => {
  const { theme } = useAnalyze();
  return (
    <Box>
      <Grid container justifyContent="space-between" spacing={2}>
        <Grid item xs={12} sm={6} md={8.5}>
          <Card sx={{ width: '100%' }}>
            <Grid container p={2.4} justifyContent="space-between">
              {manageStatusData?.map((item: any) => (
                <Grid
                  container
                  item
                  xs={12}
                  md={3}
                  key={uuidv4()}
                  justifyContent="space-around"
                >
                  <Box>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      color={theme?.palette?.grey[900]}
                    >
                      {item?.title}
                    </Typography>
                    <Typography variant="h3">{item?.count}</Typography>
                  </Box>
                  {item?.divider && (
                    <Divider
                      sx={{ borderColor: '#E5E7EB' }}
                      orientation="vertical"
                    />
                  )}
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3.5}>
          <Card sx={{ width: '100%' }}>
            <Grid container p={2.4} justifyContent="space-between">
              {manageAccountData?.map((item: any) => (
                <Grid
                  container
                  item
                  xs={12}
                  md={6}
                  key={uuidv4()}
                  justifyContent="space-around"
                >
                  <Box>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      color={theme?.palette?.grey[900]}
                    >
                      {item?.title}
                    </Typography>
                    <Typography variant="h3">{item?.count}</Typography>
                  </Box>
                  {item?.divider && (
                    <Divider
                      sx={{ borderColor: '#E5E7EB' }}
                      orientation="vertical"
                    />
                  )}
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <AnalyzeCharts />
    </Box>
  );
};

export default Analyze;
