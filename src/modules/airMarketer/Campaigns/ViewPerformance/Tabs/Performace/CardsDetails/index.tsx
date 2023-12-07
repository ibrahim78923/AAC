import { Card, Grid, Typography } from '@mui/material';

import { v4 as uuidv4 } from 'uuid';
import { performanceData } from '../Performance.data';

const CardsDetails = () => {
  return (
    <Grid container>
      {performanceData?.map((performance) => {
        return (
          <Grid md={2.2} key={uuidv4()}>
            <Card sx={{ padding: '10px' }}>
              <Typography>{performance?.headingName}</Typography>
              <Typography>{`${performance?.total}/${performance?.outOf}`}</Typography>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
export default CardsDetails;
