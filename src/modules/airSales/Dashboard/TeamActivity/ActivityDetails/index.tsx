import Image from 'next/image';

import { Grid, Typography, useTheme } from '@mui/material';

import { teamActivityData } from '@/mock/modules/airSales/Dashboard/TeamActivity';

import { v4 as uuidv4 } from 'uuid';

const ActivityDetails = () => {
  const theme = useTheme();
  return (
    <>
      {teamActivityData?.map((teamData: any) => {
        return (
          <Grid container key={uuidv4()} p={1}>
            <Grid item sm={1}>
              <Image
                alt="userImage"
                src={teamData?.userImage}
                style={{ marginTop: '6px' }}
              ></Image>
            </Grid>
            <Grid item sm={11}>
              <Typography
                sx={{ fontWeight: '600', color: theme?.palette?.common?.black }}
                variant="body4"
              >
                {' '}
                {teamData?.userName}{' '}
              </Typography>{' '}
              <Typography variant="body4">
                {' '}
                {teamData?.userActivity}{' '}
              </Typography>{' '}
              <Typography
                variant="body4"
                sx={{ fontWeight: '600', color: theme?.palette?.common?.black }}
              >
                {' '}
                {teamData?.userEmail}{' '}
              </Typography>{' '}
              <Typography variant="body4"> {teamData?.date} </Typography> <br />
              <Typography
                variant="body4"
                sx={{ fontWeight: '600', color: theme?.palette?.common?.black }}
              >
                {' '}
                {teamData?.visitWebsiteName}{' '}
              </Typography>{' '}
              <Typography variant="body3"> {teamData?.visitUrl} </Typography>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};
export default ActivityDetails;
