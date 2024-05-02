import { GoogleCalenderIcon, OfficeCalenderIcon } from '@/assets/icons';
import { Box, Button, Grid, Typography } from '@mui/material';

export const CalendarIntegration = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Box mb={1}>
            <Typography variant="formTopHeading" color="secondary.main">
              Connect Video Clendar To to Air Applecart
            </Typography>
          </Box>
          <Typography variant="body3" color="custom.main">
            Take advantage of the integration between Air Applecart and Video
            conferencing tool to boost your productivity right away.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box
                border="1px solid"
                borderColor="grey.700"
                borderRadius={2}
                marginTop="2rem"
              >
                <Box m="1rem">
                  <Box display="flex" alignItems="center" mb={1}>
                    <Box display="flex" alignItems="center" mr={1}>
                      <GoogleCalenderIcon />
                    </Box>
                    <Box>
                      <Typography
                        variant="h4"
                        color="slateBlue.main"
                        fontWeight={500}
                      >
                        Google Calendar
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    sx={{ mt: 2 }}
                    variant="body3"
                    color="custom.main"
                  >
                    Connect your calendar to let people know when you're
                    available and update your calendar as events are scheduled.
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column" m={2}>
                  <Button sx={{ mb: 1 }} variant="contained" disableElevation>
                    Connect Now
                  </Button>
                  <Button variant="outlined">View Accounts</Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                border="1px solid"
                borderColor="grey.700"
                borderRadius={2}
                marginTop="2rem"
              >
                <Box m="1rem">
                  <Box display="flex" alignItems="center" mb={1}>
                    <Box display="flex" alignItems="center" mr={1}>
                      <OfficeCalenderIcon />
                    </Box>
                    <Box>
                      <Typography
                        variant="h4"
                        color="slateBlue.main"
                        fontWeight={500}
                      >
                        Office 365 Calendar
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    sx={{ mt: 2 }}
                    variant="body3"
                    color="custom.main"
                  >
                    Connect your calendar to let people know when you're
                    available and update your calendar as events are scheduled.
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column" m={2}>
                  <Button sx={{ mb: 1 }} variant="contained" disableElevation>
                    Connect Now
                  </Button>
                  <Button variant="outlined">View Accounts</Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
