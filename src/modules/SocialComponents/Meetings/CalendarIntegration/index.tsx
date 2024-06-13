import { Box, Grid, IconButton, Typography } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { AntSwitch } from '@/components/AntSwitch';
import { calendarAccounts, calendarServices } from './CalendarIntegration.data';
import { useCalendarIntegration } from './useCalendarIntegration';
import { LoadingButton } from '@mui/lab';

export const CalendarIntegration = () => {
  const {
    handleGoogleClick,
    handleOfficeClick,
    handleDelete,
    switchLoading,
    handleChangeStatus,
    calendarListData,
    googleAuth,
    officeAuth,
  } = useCalendarIntegration();
  const GOOGLE_CALENDER = 'Google Calendar';
  return (
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
          {calendarServices?.map((service) => (
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
                      {service?.icon && <service.icon />}
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
                  <LoadingButton
                    sx={{ mb: 1 }}
                    variant="contained"
                    disabled={!googleAuth || !officeAuth}
                    onClick={
                      service?.name === GOOGLE_CALENDER
                        ? handleGoogleClick
                        : handleOfficeClick
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
              {calendarListData?.map((account) => (
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
                      {calendarAccounts(account)?.map((item) => (
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
                      />
                      <Box sx={{ scale: '1.3' }}>
                        <IconButton onClick={() => handleDelete(account?._id)}>
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
  );
};
