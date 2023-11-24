import { Box, Card, Divider, Grid, Typography } from '@mui/material';
import { manageStatusData } from './Manage.data';
import { v4 as uuidv4 } from 'uuid';

const Manage = () => {
  return (
    <Box>
      <Card>
        <Grid container justifyContent="space-between">
          {manageStatusData?.map((item: any) => (
            <>
              <Grid item xs={12} sm={6} md={2} key={uuidv4()}>
                <Typography variant="body3" fontWeight={500}>
                  {item?.title}
                </Typography>
                <Typography variant="h2">{item?.count}</Typography>
              </Grid>
              <Divider orientation="vertical" />
            </>
          ))}
        </Grid>
      </Card>
    </Box>
  );
};

export default Manage;
