import { Card, Typography, Grid, Box, useTheme } from '@mui/material';

import { widgetData } from './Widget.data';

import { v4 as uuidv4 } from 'uuid';
import { FilterLargeWidgetIcon } from '@/assets/icons';

const Widget = () => {
  const theme = useTheme();
  return (
    <Card>
      <Box p={1} sx={{ backgroundColor: theme.palette.grey[700] }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h6">Widget</Typography>
            <Typography variant="body3">
              Date range In last 30 days | compare To : Year before
            </Typography>
          </Box>
          <Box mt={1.3}>
            <FilterLargeWidgetIcon />
          </Box>
        </Box>
      </Box>
      <Grid container>
        {widgetData?.map((widgetData: any) => (
          <Grid item sm={4} key={uuidv4()} pl={3} mt={3}>
            <Card>
              <Typography
                sx={{ fontSize: 14, textAlign: 'center' }}
                color="text.secondary"
                gutterBottom
              >
                {widgetData?.dealName}
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  mb: 1.5,
                  color: theme?.palette?.primary?.main,
                  textAlign: 'center',
                }}
              >
                {widgetData?.totalDeals}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};
export default Widget;
