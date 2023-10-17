import Image from 'next/image';

import { Grid, Typography } from '@mui/material';

import { teamActivityData } from '@/mock/modules/airSales/Dashboard/TeamActivity';

import { v4 as uuidv4 } from 'uuid';

const ActivityDetails = () => {
  return (
    <>
      {teamActivityData.map((teamData: any) => {
        return (
          <Grid container key={uuidv4()}>
            <Grid item sm={1}>
              <Image
                alt="userImage"
                src={teamData?.userImage}
                style={{ marginTop: '6px' }}
              ></Image>
            </Grid>
            <Grid item sm={11}>
              <Typography variant="body4">
                {' '}
                {teamData?.userActivity}{' '}
              </Typography>{' '}
              <br />
              <Typography variant="body3"> {teamData?.visitUrl} </Typography>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};
export default ActivityDetails;
