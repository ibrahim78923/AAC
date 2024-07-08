import { Box, Grid, IconButton, Typography } from '@mui/material';
import {
  meetingsAccounts,
  videoConferencingData,
} from './VideoConferencing.data';
import { useVideoConferencing } from './useVideoConferencing';
import { LoadingButton } from '@mui/lab';
import { AntSwitch } from '@/components/AntSwitch';
import { Delete as DeleteIcon } from '@mui/icons-material';
import NoData from '@/components/NoData';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';

export const VideoConferencing = () => {
  const {
    handleGoogleMeetClick,
    handleMsTeamsClick,
    meetingsListData,
    switchLoading,
    handleChangeStatus,
    handleDelete,
    isLoading,
    isFetching,
    handleZoomClick,
    changeStatusProgress,
  } = useVideoConferencing();
  const meetings = {
    MS_TEAM: 'MS Teams',
    GOOGLE_MEET: 'Google Meet',
    ZOOM: 'Zoom',
  };
  return (
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
      {isLoading || isFetching ? (
        <SkeletonForm />
      ) : (
        <>
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
                          {item?.icon && <item.icon />}
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
                      <LoadingButton
                        variant="contained"
                        onClick={
                          item?.name === meetings?.MS_TEAM
                            ? handleMsTeamsClick
                            : item?.name === meetings?.GOOGLE_MEET
                              ? handleGoogleMeetClick
                              : handleZoomClick
                        }
                      >
                        Connect Now
                      </LoadingButton>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} mt={1}>
            <Box
              border="1px solid"
              borderColor="grey.700"
              borderRadius={2}
              marginTop="2rem"
              p={2}
            >
              <Box>
                <Typography variant="formTopHeading" color="secondary.main">
                  My Meetings Account
                </Typography>
              </Box>
              <Box>
                {meetingsListData?.length ? (
                  <Grid container mt={2} spacing={2}>
                    {meetingsListData?.map((account) => (
                      <Grid item xs={12} key={account?._id}>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          pb={1}
                          borderBottom="1px solid"
                          borderColor="grey.700"
                        >
                          <Box>
                            {meetingsAccounts(account)?.map((item: any) => (
                              <Box
                                display={'flex'}
                                key={`${account?._id}-${item?.id}`}
                              >
                                <Box
                                  display="flex"
                                  alignItems="center"
                                  mr={1}
                                  mb={-1}
                                  sx={{ scale: '1.2' }}
                                >
                                  {item?.icon && <item.icon />}
                                </Box>
                                <Typography
                                  variant="formTopHeading"
                                  color="slateBlue.main"
                                  fontWeight={500}
                                >
                                  {item?.name}
                                </Typography>
                              </Box>
                            ))}
                            <Box ml={4.2} mt={-0.5}>
                              <Typography variant="body3" color="custom.main">
                                {account?.email}
                              </Typography>
                            </Box>
                          </Box>
                          <Box display={'flex'} alignItems={'center'} gap={1}>
                            <AntSwitch
                              checked={account?.isDefault === true}
                              isLoading={switchLoading?.[account?._id]}
                              onClick={() => handleChangeStatus(account?._id)}
                              disabled={changeStatusProgress?.isLoading}
                            />
                            <Box sx={{ scale: '1.3' }}>
                              <IconButton
                                onClick={() => handleDelete(account?._id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <NoData message={'No data is available'} height={'100%'} />
                )}
              </Box>
            </Box>
          </Grid>
        </>
      )}
    </Grid>
  );
};
