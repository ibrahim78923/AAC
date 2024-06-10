import { DeleteIcon } from '@/assets/icons';
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import { AntSwitch } from '@/components/AntSwitch';
import { calendarAccounts, calendarServices } from './CalendarIntegration.data';
import { useCalendarIntegration } from './useCalendarIntegration';
import { CALENDAR_STATUS } from '@/constants/strings';

export const CalendarIntegration = () => {
  const { handleClick, handleDelete, switchLoading, handleChangeStatus } =
    useCalendarIntegration();
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Box mb={1}>
            <Typography variant="formTopHeading" color="secondary.main">
              Connect Video Calendar To Air Applecart
            </Typography>
          </Box>
          <Typography variant="body3" color="custom.main">
            Take advantage of the integration between Air Applecart and Video
            conferencing tool to boost your productivity right away.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {calendarServices?.map((service: any) => (
              <Grid item xs={6} key={service?.id}>
                <Box
                  border="1px solid"
                  borderColor="grey.700"
                  borderRadius={2}
                  marginTop="2rem"
                >
                  <Box m="1rem">
                    <Box display="flex" alignItems="center" mb={1}>
                      <Box display="flex" alignItems="center" mr={1}>
                        <service.icon />
                      </Box>
                      <Box>
                        <Typography
                          variant="h4"
                          color="slateBlue.main"
                          fontWeight={500}
                        >
                          {service?.name}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      sx={{ mt: 2 }}
                      variant="body3"
                      color="custom.main"
                    >
                      {service?.description}
                    </Typography>
                  </Box>
                  <Box display="flex" flexDirection="column" m={2}>
                    <Button
                      sx={{ mb: 1 }}
                      variant="contained"
                      disableElevation
                      onClick={handleClick}
                    >
                      Connect Now
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box
            border="1px solid"
            borderColor="grey.700"
            borderRadius={2}
            marginTop="2rem"
            p={2}
          >
            <Box>
              <Typography variant="formTopHeading" color="secondary.main">
                My Calendar Account
              </Typography>
            </Box>
            <Box>
              <Grid container mt={2} spacing={2}>
                {calendarAccounts?.map((account: any) => (
                  <Grid item xs={12} key={account?.id}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      pb={1}
                      borderBottom="1px solid"
                      borderColor="grey.700"
                    >
                      <Box display="flex" alignItems="center">
                        <Box
                          display="flex"
                          alignItems="center"
                          mr={1}
                          sx={{ scale: '1.2' }}
                        >
                          <account.icon />
                        </Box>
                        <Box>
                          <Typography
                            variant="formTopHeading"
                            color="slateBlue.main"
                            fontWeight={500}
                          >
                            {account?.name}
                          </Typography>
                          <Box>
                            <Typography variant="body3" color="custom.main">
                              {account?.email}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box display={'flex'} alignItems={'center'} gap={1}>
                        <AntSwitch
                          checked={account?.status === CALENDAR_STATUS?.ACTIVE}
                          isLoading={switchLoading?.[account?._id]}
                          onClick={handleChangeStatus}
                        />
                        <Box sx={{ scale: '1.5' }} pt={0.4}>
                          <IconButton onClick={handleDelete}>
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
