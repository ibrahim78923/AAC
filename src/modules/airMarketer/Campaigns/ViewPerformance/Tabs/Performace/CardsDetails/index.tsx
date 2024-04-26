import { Card, Grid, Typography, useTheme } from '@mui/material';

import { v4 as uuidv4 } from 'uuid';
import { performanceData } from '../Performance.data';

const CardsDetails = () => {
  const theme = useTheme();
  return (
    <>
      {performanceData?.map((performance) => {
        return (
          <Grid item xs={12} sm={6} lg={4} xl={2.4} key={uuidv4()}>
            <Card
              sx={{
                padding: '16px',
                borderBottom: `3px solid ${theme?.palette?.primary?.main}`,
              }}
            >
              <Typography variant="body3" fontWeight={500}>
                {performance?.headingName}
              </Typography>
              <Typography>
                <Typography
                  component="span"
                  sx={{ fontSize: '22px', fontWeight: 600 }}
                >
                  {`${performance?.total}`}
                </Typography>
                /
                <Typography component="span">{`${performance?.outOf}`}</Typography>
              </Typography>
            </Card>
          </Grid>
        );
      })}
    </>
  );
};
export default CardsDetails;
