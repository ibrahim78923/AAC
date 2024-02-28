import { Box, Grid, Typography, useTheme } from '@mui/material';
import { styles } from './indicators.style';

export const Indicators = () => {
  const theme = useTheme();

  const ticketDashboardCardsData = [
    {
      id: 1,
      count: '30',
      label: 'Total Calls',
      color: theme?.palette?.primary?.main,
    },
    {
      id: 2,
      count: '15',
      label: 'Incoming',
      color: theme?.palette?.error?.main,
    },
    {
      id: 3,
      count: '15',
      label: 'Outgoing ',
      color: theme?.palette?.custom?.navy_blue,
    },
    {
      id: 4,
      count: '1',
      label: 'Total Missed',
      color: theme?.palette?.warning?.main,
    },
    {
      id: 5,
      count: '1',
      label: 'Missed Incoming',
      color: theme?.palette?.success?.main,
    },
    {
      id: 6,
      count: '0',
      label: 'Missed Outgoing',
      color: theme?.palette?.custom?.bright,
    },
    {
      id: 7,
      count: '2',
      label: 'Abandoned',
      color: theme?.palette?.success?.main,
    },
    {
      id: 8,
      count: '4',
      label: 'Transferred',
      color: theme?.palette?.custom?.bright,
    },
  ];

  return (
    <Box sx={styles.mainDiv(theme)}>
      <Typography variant="h6">Key Point indicators</Typography>
      <Box display={'flex'} sx={{ overflow: 'scroll' }}>
        {ticketDashboardCardsData?.map((item: any) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={item?.id}>
            <Box sx={styles?.innerBox(item, theme)}>
              <Typography
                variant="body3"
                sx={{ marginLeft: '10px', color: theme?.palette?.custom?.main }}
              >
                {item?.label}{' '}
              </Typography>
              <Typography
                variant="h4"
                sx={{ marginLeft: '10px', textAlign: 'end' }}
              >
                {item?.count}{' '}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Box>
    </Box>
  );
};
