import { Card, CardContent, Typography, Grid } from '@mui/material';

import { widgetData } from './Widget.data';

import { v4 as uuidv4 } from 'uuid';

const Widget = () => {
  return (
    <Grid container>
      {widgetData?.map((widgetData: any) => (
        <Grid item sm={3} key={uuidv4()} style={{ margin: '10px' }}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {widgetData?.dealName}
              </Typography>

              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {widgetData?.totalDeals}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
export default Widget;
