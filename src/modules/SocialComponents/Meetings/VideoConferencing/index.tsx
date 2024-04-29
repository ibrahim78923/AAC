import { Box, Button, Grid, Typography } from '@mui/material';
import { videoConferencingData } from './VideoConferencing.data';

export const VideoConferencing = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Box mb={1}>
            <Typography variant="formTopHeading" color="secondary.main">
              Connect Video Conferencing Tool to Air Applecart
            </Typography>
          </Box>
          <Typography variant="body3" color="custom.main">
            Take advantage of the integration between Air Applecart and Video
            conferencing tool to boost your productivity right away.
          </Typography>
          <Box mt={1}>
            <Typography variant="body3" color="custom.main">
              Select Video conferencing tool
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3} alignItems="stretch">
            {videoConferencingData?.map((item: any) => (
              <Grid key={item?.id} item xs={6} minHeight="100%">
                <Box
                  border="1px solid"
                  borderColor="grey.700"
                  borderRadius={2}
                  marginTop="2rem"
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  height="100%"
                >
                  <Box m="1rem">
                    <Box display="flex" alignItems="center" mb={1}>
                      <Box display="flex" alignItems="center" mr={1}>
                        {item?.icon}
                      </Box>
                      <Box>
                        <Typography
                          variant="h4"
                          color="slateBlue.main"
                          fontWeight={500}
                        >
                          {item?.name}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      sx={{ mt: 2 }}
                      variant="body3"
                      color="custom.main"
                    >
                      {item?.description}
                    </Typography>
                  </Box>
                  <Box display="flex" flexDirection="column" m={2}>
                    <Button variant="contained">Connect Now</Button>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
