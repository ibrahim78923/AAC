import Image from 'next/image';
import { Box, Button, Grid, Typography } from '@mui/material';
import { PlusSharedIcon } from '@/assets/icons';
import { ZoomImage, TeamsImage } from '@/assets/images';
import { NoMeetingsPropsI } from './NoMeetings.interface';
import { styles } from './NoMeetings.styles';

export const NoMeetings = ({ setDrawerOpen }: NoMeetingsPropsI) => {
  return (
    <>
      <Grid mt="100px" container>
        <Grid sx={styles?.noMeetingsGrid} item xs={12}>
          <Box sx={styles?.bgImageBox}></Box>
          <Box textAlign="center">
            <Typography
              variant="body2"
              color="custom.bluish_gray"
              fontWeight="500"
            >
              Schedule virtual and in-person meetings right from the CRM.
            </Typography>
          </Box>
          <Button
            sx={styles?.addMeetingButton}
            startIcon={<PlusSharedIcon />}
            disableElevation
            onClick={() => setDrawerOpen(true)}
            variant="contained"
          >
            Add Meeting
          </Button>
          <Box sx={styles?.innerBox}>
            <Typography variant="body2" color="common.black" fontWeight="500">
              Bring your meetings into the CRM
            </Typography>
            <Box sx={styles?.imageBoxStyles}>
              <Image alt="Teams Logo" src={TeamsImage} />
              <Image alt="Zoom Logo" src={ZoomImage} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
