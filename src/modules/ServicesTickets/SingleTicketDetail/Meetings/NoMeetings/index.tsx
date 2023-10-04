import Image from 'next/image';
import { Box, Button, Grid, Typography } from '@mui/material';
import { PlusSharedIcon } from '@/assets/icons';
import { DiscussionImage, ZoomImage, TeamsImage } from '@/assets/images';
import { NoMeetingsPropsI } from './NoMeetings.interface';

export const NoMeetings = ({ setDrawerOpen }: NoMeetingsPropsI) => {
  return (
    <>
      <Grid mt="100px" container>
        <Grid
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '15px',
          }}
          item
          xs={12}
        >
          <Box
            sx={{
              background: `url(${DiscussionImage}), lightgray 50% / cover no-repeat`,
            }}
          ></Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="body2"
              color="custom.bluish_gray"
              fontWeight="500"
            >
              Schedule virtual and in-person meetings right from the CRM.
            </Typography>
          </Box>
          <Button
            sx={{
              fontWeight: '500',
            }}
            startIcon={<PlusSharedIcon />}
            disableElevation
            onClick={() => setDrawerOpen(true)}
            variant="contained"
          >
            Add Meeting
          </Button>
          <Box
            sx={{
              borderRadius: '8px',
              border: '1px solid var(--gray-200, #EAECF0)',
              background: '#FFF',
              boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.06)',
              p: '16px 23px',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <Typography variant="body2" color="common.black" fontWeight="500">
              Bring your meetings into the CRM
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image alt="Teams Logo" src={TeamsImage} />
              <Image alt="Zoom Logo" src={ZoomImage} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
